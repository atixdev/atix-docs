# Consulta de transacción

Este servicio permite consultar el estado de una transacción previamente generada (por ejemplo, al crear un código QR) utilizando su `transactionId` devuelto por el gateway.

## 1. Endpoints

| Entorno    | URL                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------ |
| Sandbox    | `https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/transactions/:transactionId`             |
| Producción | `https://gateway.atix.com.pe/PaymentGatewayJWS/transactions/:transactionId`                     |

> Reemplazar `:transactionId` por el identificador numérico devuelto al crear la transacción.

## 2. Request

### Headers

```
Key: Authorization
Value: Bearer YOUR_API_KEY
```

### Parámetros de URL

| Parámetro       | Tipo   | Descripción                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| `transactionId` | number | Identificador de la transacción devuelto por el gateway.     |

## 3. Response

### Body

```json
{
  "reference": "QR-20240121-1",
  "transactionId": 58741,
  "resultCode": "00",
  "expiresAt": "2024-01-21T12:31:00Z",
  "qrHash": "00020101021143650016COM.PE.INTERBANK010100304...6304ABCD"
}
```

### Diccionario de datos

| Campo           | Tipo   | Descripción                                                                                       |
| --------------- | ------ | ------------------------------------------------------------------------------------------------- |
| `reference`     | string | Identificador único de la transacción en el comercio.                                             |
| `transactionId` | number | Identificador de la transacción en el gateway.                                                    |
| `resultCode`    | string | Código de resultado de la transacción. `"00"` indica aprobada.                                    |
| `expiresAt`     | string | Fecha y hora de expiración de la transacción en formato ISO 8601.                                 |
| `qrHash`        | string | Contenido del QR. Solo se devuelve si el pago aún está pendiente.                                 |

## 4. Consideraciones

- Se recomienda respetar el `expiresAt` para no mostrar QRs vencidos al usuario.

## 5. Ejemplos de implementación

::: code-group

```javascript
const transactionId = 58741;
const url = `https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/transactions/${transactionId}`;

const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});

if (!response.ok) {
  throw new Error(`Error del servidor: ${response.status}`);
}

const result = await response.json();

console.log('Referencia:', result.reference);
console.log('Resultado:', result.resultCode);
console.log('Expira en:', result.expiresAt);

if (result.qrHash) {
  console.log('Pago aún pendiente, QR:', result.qrHash);
}
```

```csharp
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

var transactionId = 58741;
var url = $"https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/transactions/{transactionId}";

using var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, url);
request.Headers.Add("Authorization", "Bearer YOUR_API_KEY");

var response = await client.SendAsync(request);

if (!response.IsSuccessStatusCode)
{
    throw new Exception($"Error del servidor: {(int)response.StatusCode}");
}

var responseBody = await response.Content.ReadAsStringAsync();
var result = JsonSerializer.Deserialize<JsonElement>(responseBody);

var reference  = result.GetProperty("reference").GetString();
var resultCode = result.GetProperty("resultCode").GetString();
var expiresAt  = result.GetProperty("expiresAt").GetString();

Console.WriteLine($"Referencia: {reference}");
Console.WriteLine($"Resultado:  {resultCode}");
Console.WriteLine($"Expira en:  {expiresAt}");

if (result.TryGetProperty("qrHash", out var qrHash))
{
    Console.WriteLine($"Pago aún pendiente, QR: {qrHash.GetString()}");
}
```

```php
<?php

$transactionId = 58741;
$url = "https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/transactions/{$transactionId}";

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer YOUR_API_KEY',
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error    = curl_error($ch);

curl_close($ch);

if ($error) {
    throw new RuntimeException("cURL error: $error");
}

if ($httpCode >= 400) {
    throw new RuntimeException("Error del servidor: $httpCode");
}

$result = json_decode($response, true);

if (!is_array($result)) {
    throw new RuntimeException("Respuesta inesperada del servidor.");
}

echo "Referencia: " . $result['reference'] . "\n";
echo "Resultado:  " . $result['resultCode'] . "\n";
echo "Expira en:  " . $result['expiresAt'] . "\n";

if (!empty($result['qrHash'])) {
    echo "Pago aún pendiente, QR: " . $result['qrHash'] . "\n";
}
```

:::
