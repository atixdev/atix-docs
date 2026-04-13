# Link de Pago

## 1. Generar link de pago por medio de API

En la presente documentación se detalla el endpoint para generar links de pagos así como su request y response.

## 2. Endpoint

```
POST
https://gateway.atix.com.pe/payment/v1/api/UrlPayment
```

## 3. Parámetros en el header (Autenticación)

```javascript
Key: 'X-API-KEY'
Value: // Key generada al comercio al momento de su afiliación

Key: 'Content-Type'
Value: 'application/json'
```

## 4. Request

Se detallan cada uno de los campos que se deben enviar para generar el link de pago **(POST)**

```json
{
  "totalamount": 1.01,
  "reference": "20240121-1",
  "reference2": "20240121-1",
  "email": "ejemplo@gmail.com",
  "clientip": "172.0.0.99",
  "currency": "PEN",
  "transactiontype": "999",
  "sendmail": "1"
}
```

| Campo             | Descripción                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `totalamount`     | Valor total de la venta.                                                    |
| `reference`       | Número de referencia del comercio, orden o transacción.                     |
| `reference2`      | Número de referencia interno, sólo visible por el comercio.                 |
| `email`           | Email del tarjetahabiente para que le llegue el link de pago.               |
| `clientip`        | IP de donde salió la petición.                                              |
| `currency`        | Tipo de moneda, `PEN` o `USD` dependiendo si su cuenta es en soles o dólares. |
| `transactiontype` | Indica el tipo de transacción (Siempre debe ir `999`).                      |
| `sendmail`        | `1` para enviar el link al correo electrónico del tarjetahabiente.          |

## 5. Diccionario de datos request

| Campo           | Tipo   | Longitud | Requerido | Descripción                                                           |
| --------------- | ------ | -------- | --------- | --------------------------------------------------------------------- |
| totalamount     | Money  |          | Si        | Monto a procesar                                                      |
| reference       | String | 30       | Si        | Referencia única por transacción                                      |
| reference2      | String | 200      | Si        | Referencia opcional                                                   |
| currency        | String | 10       | Si        | Moneda formato ISO 4217                                               |
| email           | String | 200      | Si        | Correo electrónico del tarjetahabiente                                |
| clientip        | String | 50       | Si        | Ip del cliente que realiza la operación                               |
| transactiontype | String | 3        | Si        | Indica el tipo de transacción (Para link de pago es `999`)            |
| sendmail        | String | 1        | Si        | Indica el envío del link por email al tarjetahabiente                 |

## 6. Response

```json
{
    "success": true,
    "errorcode": "",
    "errordescription": "",
    "data": {
        "UrlPayment": "https://gateway.atix.com.pe/BH4013908",
        "Tokenid": "BH4013908"
    }
}
```

## 7. Diccionario de datos response

| Campo            | Tipo   | Longitud | Requerido | Descripción                                                                       |
| ---------------- | ------ | -------- | --------- | --------------------------------------------------------------------------------- |
| success          | Bool   |          | Si        | Si la transacción fue satisfactoria o no                                          |
| errorcode        | String |          | Si        | Tipo de error en caso de que la transacción no fue satisfactoria                  |
| errordescription | String | 50       | Si        | Descripción del error presentado                                                  |
| UrlPayment       | String | 500      | Si        | Url a la que se debe hacer redirect al usuario (incluye token único para el pago) |
| Tokenid          | String | 250      | Si        | Token único devuelto por transacción                                              |

## 8. Data de prueba

### Caso exitoso

| Número             | Mes/año | CVV | Código de respuesta |
| ------------------ | ------- | --- | ------------------- |
| 424242424242424242 | 10/2026 | 999 | 00                  |

### Caso denegado

| Número           | Mes/año | CVV | Código de respuesta |
| ---------------- | ------- | --- | ------------------- |
| 5431111111111111 | 10/2025 | 999 | -99                 |
