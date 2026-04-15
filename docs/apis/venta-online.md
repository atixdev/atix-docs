# Venta online

## 1. Flujo general

1. El servidor del comercio construye el payload con los datos de la transacción.
2. Se realiza una petición `POST` al endpoint de autenticación del gateway.
3. El gateway devuelve una URL única para la transacción.
4. El comercio redirige al tarjetahabiente a esa URL para completar el pago.

## 2. Endpoints

| Entorno    | URL                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| Sandbox    | `https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/Service1.svc/GBCPE_AuthenticateUser`             |
| Producción | `https://gateway.atix.com.pe/PaymentGatewayJWS/Service1.svc/GBCPE_AuthenticateUser`                     |

## 3. Parámetros del request

| Campo          | Tipo   | Descripción                                              |
| -------------- | ------ | -------------------------------------------------------- |
| `Apikey`       | string | Clave de API provista por el gateway.                    |
| `Version`      | string | Siempre debe ser `V1.1`.                                 |
| `Data`         | string | JSON serializado con los datos de la transacción.        |

### Campos dentro de `Data`

| Campo           | Tipo   | Descripción                                              |
| --------------- | ------ | -------------------------------------------------------- |
| `totalamount`   | float  | Monto total de la transacción.                           |
| `currency`      | string | Código de moneda (ej. `PEN`, `USD`).                     |
| `reference`     | string | Identificador único de la transacción en el comercio.    |
| `email`         | string | Correo electrónico del tarjetahabiente.                  |

## 4. Ejemplos de implementación

::: code-group

```javascript
const url = 'https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/Service1.svc/GBCPE_AuthenticateUser';

const payload = {
  Apikey: 'YOUR_API_KEY',
  Version: 'V1.1',
  Data: JSON.stringify({
    totalamount: 10.00,
    currency: 'PEN',
    reference: 'ORDER-' + Date.now(), // identificador único por transacción
    email: 'cardholder@example.com',
  }),
};

const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  throw new Error(`Error del servidor: ${response.status}`);
}

const result = await response.json();

if (!Array.isArray(result) || result.length === 0) {
  throw new Error('Respuesta inesperada del servidor.');
}

const gatewayUrl = result[0]?.Url;

if (!gatewayUrl) {
  throw new Error('No se recibió una URL válida en la respuesta.');
}

// Redirigir al tarjetahabiente
window.location.href = gatewayUrl;
```

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var url = "https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/Service1.svc/GBCPE_AuthenticateUser";

var data = JsonSerializer.Serialize(new
{
    totalamount = 10.00,
    currency = "PEN",
    reference = "ORDER-" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(), // identificador único por transacción
    email = "cardholder@example.com",
});

var payload = JsonSerializer.Serialize(new
{
    Apikey = "YOUR_API_KEY",
    Version = "V1.1",
    Data = data,
});

using var client = new HttpClient();
var content = new StringContent(payload, Encoding.UTF8, "text/plain");
var response = await client.PostAsync(url, content);

if (!response.IsSuccessStatusCode)
{
    throw new Exception($"Error del servidor: {(int)response.StatusCode}");
}

var responseBody = await response.Content.ReadAsStringAsync();
var result = JsonSerializer.Deserialize<JsonElement[]>(responseBody);

if (result == null || result.Length == 0)
{
    throw new Exception("Respuesta inesperada del servidor.");
}

var gatewayUrl = result[0].GetProperty("Url").GetString();

if (string.IsNullOrEmpty(gatewayUrl))
{
    throw new Exception("No se recibió una URL válida en la respuesta.");
}

// Redirigir al tarjetahabiente
Console.WriteLine($"Redirigir a: {gatewayUrl}");
```

```php
<?php

// Usar URL de sandbox para pruebas, producción para cobros reales
$url = 'https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/Service1.svc/GBCPE_AuthenticateUser';

$payload = [
  'Apikey'  => 'YOUR_API_KEY',
  'Version' => 'V1.1',
  'Data'    => json_encode([
    'totalamount' => 10.00,
    'currency'    => 'PEN',
    'reference'   => 'ORDER-' . uniqid(), // identificador único por transacción
    'email'       => 'cardholder@example.com',
  ]),
];

$ch = curl_init($url);

curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST           => true,
  CURLOPT_HTTPHEADER     => ['Content-Type: text/plain'],
  CURLOPT_POSTFIELDS     => json_encode($payload),
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error    = curl_error($ch);

curl_close($ch);

if ($error) {
    throw new RuntimeException("cURL error: $error");
}

$result = json_decode($response, true);

if (!is_array($result) || empty($result)) {
    throw new RuntimeException("Respuesta inesperada del servidor.");
}

$gatewayUrl = $result[0]['Url'] ?? null; // URL de pago para el tarjetahabiente

if (!$gatewayUrl) {
    throw new RuntimeException("No se recibió una URL válida en la respuesta.");
}

// Redirigir al tarjetahabiente
header("Location: $gatewayUrl");
exit;

```

:::

## 5. Respuesta esperada

El gateway devuelve un array JSON. El campo `Url` del primer elemento contiene la URL a la que se debe redirigir al tarjetahabiente.

```json
[
  {
    "Url": "https://gateway.atix.com.pe/..."
  }
]
```

## 6. Consideraciones

- El campo `reference` debe ser único por transacción para evitar duplicados.
- Usar siempre HTTPS en todas las comunicaciones.
- Nunca exponer el `Apikey` en el frontend; la petición debe realizarse desde el servidor.
- Verificar el `$httpCode` HTTP además de los errores de cURL para detectar fallos del servidor.

## 7. Data de prueba

### Caso exitoso

| Número              | Mes/año | CVV | Código de respuesta |
| ------------------- | ------- | --- | ------------------- |
| 4242 4242 4242 4242 | 10/2028 | 999 | 00                  |

### Caso denegado

| Número              | Mes/año | CVV | Código de respuesta |
| ------------------- | ------- | --- | ------------------- |
| 5431 1111 1111 1111 | 10/2028 | 999 | -99                 |

### Caso exitoso 3DS

| Número              | Mes/año | CVV | Código de respuesta |
| ------------------- | ------- | --- | ------------------- |
| 4918 9141 0719 5005 | 10/2028 | 999 | 00                  |
