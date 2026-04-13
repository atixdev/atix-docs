# Venta online

Es la principal integración a realizar.<br/>
El flujo consiste en autenticar la transacción contra el gateway de pago, obtener una URL de redirección y enviar al tarjetahabiente a completar el pago.

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

## 4. Ejemplo de implementación (PHP)

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
