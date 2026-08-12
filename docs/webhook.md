# Webhook Atix

## Estructura del cuerpo

Al recibir un webhook, el cuerpo de la solicitud tendrá el siguiente formato JSON:

```json
{
  "event": "payment_successful",
  "signature": "849a6a208022b66f9f6ae65dd235513adebdabf315d5e006d3adea0c6a867d11",
  "data": {
    "reference": "1000",
    "result_transaction_code": "00",
    "payment_method": 3
  }
}
```

### Campos

| Campo | Descripción |
|---|---|
| `event` | Nombre del evento disparado |
| `signature` | Hash de verificación para validar la autenticidad del webhook |
| `data.reference` | Identificador de referencia de la transacción |
| `data.result_transaction_code` | Código de resultado de la transacción (`"00"` = exitoso, `"99"` = fallido) |
| `data.payment_method` | Método de pago (`1` = Tarjeta, `3` = QR, `4` = CCIV) |

> **Nota:** El evento `payment_successful` es el único evento activo en la actualidad.

---

## Validación del Signature

Para garantizar que el webhook proviene de una fuente confiable, debes validar el campo `signature` al recibirlo.

### Cómo generar el signature

Concatena los siguientes valores y aplica un hash **SHA-256**:

```
signature = SHA256(event + reference + result_transaction_code + security_key)
```

### Parámetros

| Parámetro | Descripción |
|---|---|
| `event` | El nombre del evento recibido (ej. `payment_successful`) |
| `reference` | El valor de `data.reference` recibido en el webhook |
| `result_transaction_code` | El valor de `data.result_transaction_code` recibido en el webhook |
| `security_key` | Llave secreta obtenida desde el dashboard |

### Proceso de validación

1. Obtén tu `security_key` desde el dashboard de Atix.
2. Al recibir el webhook, genera el signature con la fórmula indicada.
3. Compara el signature generado con el valor recibido en el campo `signature` del webhook.
4. Si ambos valores **coinciden**, el evento es válido y puede procesarse con seguridad.
5. Si los valores **no coinciden**, rechaza el evento, ya que podría tratarse de una solicitud no autorizada.

### Ejemplo en código

::: code-group

```javascript
const crypto = require('crypto');

function validateSignature(event, reference, resultTransactionCode, securityKey, receivedSignature) {
  const data = `${event}${reference}${resultTransactionCode}${securityKey}`;
  const generatedSignature = crypto.createHash('sha256').update(data).digest('hex');
  return generatedSignature === receivedSignature;
}
```

```csharp
using System.Security.Cryptography;
using System.Text;

bool ValidateSignature(string eventName, string reference, string resultTransactionCode, string securityKey, string receivedSignature)
{
    string data = $"{eventName}{reference}{resultTransactionCode}{securityKey}";
    byte[] bytes = SHA256.HashData(Encoding.UTF8.GetBytes(data));
    string generatedSignature = Convert.ToHexString(bytes).ToLower();
    return generatedSignature == receivedSignature;
}
```

```python
import hashlib

def validate_signature(event, reference, result_transaction_code, security_key, received_signature):
    data = f"{event}{reference}{result_transaction_code}{security_key}"
    generated_signature = hashlib.sha256(data.encode()).hexdigest()
    return generated_signature == received_signature
```

:::