# Pago QR

Este servicio permite generar un código QR de pago. El `qrHash` devuelto debe ser renderizado como una imagen QR en el lado del cliente para que el usuario pueda escanearlo y completar el pago.

## 1. Endpoint

| | |
| ---------- | ---------------------------------------------------------------------------------- |
| Método | POST |
| Sandbox    | `https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/Service1.svc/transactions/qr` |
| Producción | `https://gateway.atix.com.pe/PaymentGatewayJWS/Service1.svc/transactions/qr`         |

## 2. Request
### Headers

```
Key: Authorization
Value: Bearer YOUR_API_KEY

Key: Content-Type
Value: application/json
```

### Body

```json
{
  "amount": 10.00,
  "reference": "QR-20240121-1",
  "expiresIn": 30
}
```

### Diccionario de datos

| Campo       | Tipo   | Descripción                                                       |
| ----------- | ------ | ----------------------------------------------------------------- |
| `amount`    | number | Monto total de la transacción.                                    |
| `reference` | string | Identificador único de la transacción en el comercio.             |
| `expiresIn` | number | Tiempo de expiración del QR en minutos.                           |

## 3. Response

### Body
```json
{
  "reference": "QR-20240121-1",
  "transactionId": 58741,
  "expiresAt": "2024-01-21T12:31:00Z",
  "qrHash": "00020101021143650016COM.PE.INTERBANK010100304...6304ABCD"
}
```

### Diccionario de datos

| Campo           | Tipo   | Descripción                                                                                |
| --------------- | ------ | ------------------------------------------------------------------------------------------ |
| `reference`     | string | Identificador único de la transacción, devuelto por el gateway.                            |
| `transactionId` | number | Identificador de la transacción, útil para consultas posteriores.                          |
| `expiresAt`     | string | Fecha y hora de expiración del QR en formato ISO 8601.                                     |
| `qrHash`        | string | Contenido del QR que debe ser renderizado como imagen para que el tarjetahabiente escanee. |

## 4. Consideraciones

- El campo `reference` debe ser único por transacción para evitar duplicados.
- El `qrHash` no es una URL: es el contenido crudo que debe convertirse a imagen QR (por ejemplo, usando la librería `qrcode` en JavaScript, `QRCoder` en C# o `endroid/qr-code` en PHP).
- El QR deja de ser válido una vez alcanzada la fecha indicada en `expiresAt`.
- Nunca exponer el `ApiKey` en el frontend; la petición debe realizarse desde el servidor.

## 5. Ejemplos de implementación

::: code-group

```javascript
const url = 'https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/transactions/qr';

const payload = {
  amount: 10.00,
  reference: 'QR-' + Date.now(), // identificador único por transacción
  expiresIn: 30, // minutos
};

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY',
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  throw new Error(`Error del servidor: ${response.status}`);
}

const result = await response.json();

// `result.qrHash` debe renderizarse como imagen QR en el frontend
// Ejemplo con la librería `qrcode`:
//   import QRCode from 'qrcode';
//   const dataUrl = await QRCode.toDataURL(result.qrHash);
//   document.getElementById('qr').src = dataUrl;

console.log('Transacción:', result.transactionId);
console.log('Expira en:', result.expiresAt);
```

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var url = "https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/transactions/qr";

var payload = JsonSerializer.Serialize(new
{
    amount = 10.00,
    reference = "QR-" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(), // identificador único por transacción
    expiresIn = 30, // minutos
});

using var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Post, url)
{
    Content = new StringContent(payload, Encoding.UTF8, "application/json"),
};
request.Headers.Add("Authorization", "Bearer YOUR_API_KEY");

var response = await client.SendAsync(request);

if (!response.IsSuccessStatusCode)
{
    throw new Exception($"Error del servidor: {(int)response.StatusCode}");
}

var responseBody = await response.Content.ReadAsStringAsync();
var result = JsonSerializer.Deserialize<JsonElement>(responseBody);

var qrHash = result.GetProperty("qrHash").GetString();

// `qrHash` debe renderizarse como imagen QR.
// Ejemplo con la librería `QRCoder` (NuGet: QRCoder):
//   using var qrGenerator = new QRCodeGenerator();
//   using var qrCodeData = qrGenerator.CreateQrCode(qrHash, QRCodeGenerator.ECCLevel.Q);
//   using var qrCode = new PngByteQRCode(qrCodeData);
//   var pngBytes = qrCode.GetGraphic(20);
//   File.WriteAllBytes("qr.png", pngBytes);

Console.WriteLine($"Transacción: {result.GetProperty("transactionId").GetInt64()}");
Console.WriteLine($"Expira en: {result.GetProperty("expiresAt").GetString()}");
```

```php
<?php

// Usar URL de sandbox para pruebas, producción para cobros reales
$url = 'https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/transactions/qr';

$payload = json_encode([
    'amount'    => 10.00,
    'reference' => 'QR-' . uniqid(), // identificador único por transacción
    'expiresIn' => 30, // minutos
]);

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer YOUR_API_KEY',
    ],
    CURLOPT_POSTFIELDS     => $payload,
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

if (!is_array($result) || empty($result['qrHash'])) {
    throw new RuntimeException("Respuesta inesperada del servidor.");
}

// `$result['qrHash']` debe renderizarse como imagen QR.
// Ejemplo con `endroid/qr-code` (composer require endroid/qr-code):
//   use Endroid\QrCode\QrCode;
//   $qrCode = new QrCode($result['qrHash']);
//   $qrCode->writeFile('qr.png');

echo "Transacción: " . $result['transactionId'] . "\n";
echo "Expira en: "   . $result['expiresAt']     . "\n";
```

:::
