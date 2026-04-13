## Integración Atix

Ejemplo de creación de un pago en Atix desde php.

```php
<?php

// url for testing
$url = 'https://gateway.atix.com.pe/PaymentGatewayJWS_Sandbox/Service1.svc/GBCPE_AuthenticateUser';

$payload = [
    'Apikey'  => 'secret',
    'Version' => 'V1.1',
    'Data'    => json_encode([
        'totalamount' => 1.00,
        'currency'    => 'PEN',
        'reference'   => 'test-20260312-1201',  // unique id for transaction
        'email'       => 'cardholder@gmail.com',
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

$gatewayUrl = $result[0]['Url'] ?? null;  // transaction url for cardholder

if (!$gatewayUrl) {
    throw new RuntimeException("No se recibió una URL válida en la respuesta.");
}

echo $gatewayUrl;
```

Url para producción: https://gateway.atix.com.pe/PaymentGatewayJWS/Service1.svc/GBCPE_AuthenticateUser
