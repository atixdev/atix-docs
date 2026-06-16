# Consulta de transacción

## 1. Endpoints

| Entorno    | URL                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| Sandbox    | `https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/Service1.svc/GBCPE_ResultTransaction`           |
| Producción | `https://gateway.atix.com.pe/PaymentGatewayJWS/Service1.svc/GBCPE_ResultTransaction`                   |

## 2. Parámetros del request

| Campo    | Tipo   | Descripción                                     |
| -------- | ------ | ---------------------------------------------- |
| `Token`  | string | Token obtenido en la respuesta de venta-online |

## 3. Respuesta del servidor

| Campo            | Tipo   | Descripción                                              |
| ---------------- | ------ | -------------------------------------------------------- |
| `ReferenceCode`  | string | Código de autorización bancario (para pagos con tarjetas) |
| `ResultCode`     | string | `00` = Aprobada, cualquier otro valor es un error       |
| `TotalAmount`    | number | Monto de la venta                                        |
| `Reference`      | string | Referencia asignada por el comercio                     |

## 4. Ejemplos de implementación

::: code-group

```javascript
const url = 'https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/Service1.svc/GBCPE_ResultTransaction';

const payload = {
  Token: 'TOKEN_OBTENIDO_EN_VENTA_ONLINE',
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

if (result.ResultCode === '00') {
  console.log('Transacción aprobada');
  console.log('Código de autorización:', result.ReferenceCode);
} else {
  console.log('Transacción denegada');
}
```

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var url = "https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/Service1.svc/GBCPE_ResultTransaction";

var payload = JsonSerializer.Serialize(new
{
    Token = "TOKEN_OBTENIDO_EN_VENTA_ONLINE"
});

using var client = new HttpClient();
var content = new StringContent(payload, Encoding.UTF8, "text/plain");
var response = await client.PostAsync(url, content);

if (!response.IsSuccessStatusCode)
{
    throw new Exception($"Error del servidor: {(int)response.StatusCode}");
}

var responseBody = await response.Content.ReadAsStringAsync();
var result = JsonSerializer.Deserialize<JsonElement>(responseBody);

if (result.GetProperty("ResultCode").GetString() == "00")
{
    Console.WriteLine("Transacción aprobada");
    Console.WriteLine($"Código de autorización: {result.GetProperty("ReferenceCode").GetString()}");
}
else
{
    Console.WriteLine("Transacción denegada");
}
```

```php
<?php

$url = 'https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/Service1.svc/GBCPE_ResultTransaction';

$payload = json_encode([
    'Token' => 'TOKEN_OBTENIDO_EN_VENTA_ONLINE',
]);

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => ['Content-Type: text/plain'],
    CURLOPT_POSTFIELDS     => $payload,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error    = curl_error($ch);

curl_close($ch);

if ($error) {
    throw new RuntimeException("cURL error: $error");
}

$result = json_decode($response, true);

if ($result['ResultCode'] === '00') {
    echo "Transacción aprobada\n";
    echo "Código de autorización: " . $result['ReferenceCode'] . "\n";
} else {
    echo "Transacción denegada\n";
}

?>
```

:::

## 5. Consideraciones

- Usar siempre HTTPS en todas las comunicaciones.
