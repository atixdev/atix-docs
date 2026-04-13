# Pago tarjetas

## 1. Procesar pagos directo por medio de API

En la presente documentación se detalla el endpoint para el procesamiento de pagos, así como su request y response.

::: warning Importante
Para poder procesar mediante el API de pago, el comercio debe contar con certificación PCI DSS.
:::

## 2. Endpoint Prod

```
https://gateway.atix.com.pe/payment/v1/api/PaymentGateway
```

## 3. Parámetros en el header

```
Key: X-API-KEY
Value: Proporcionado al crear el cliente

Key: Content-Type
Value: application/json
```

## 4. Request

Se detallan cada uno de los campos que se deben enviar para procesar el pago.

```json
{
  "cardnumber": "4242424242424242",
  "cardholdername": "Pedro Perez",
  "cvv": "963",
  "cardexpiry": "0625",
  "totalamount": 3.00,
  "reference": "20220919",
  "email": "ejemplo@gmail.com",
  "phone": "",
  "clientip": "192.168.30.1",
  "clientcountry": "MX",
  "clienturl": "",
  "transactiontype": "200",
  "sendmail": 1
}
```

## 5. Diccionario de datos request

| Campo           | Tipo   | Longitud | Requerido | Descripción                                                                                          |
| --------------- | ------ | -------- | --------- | ---------------------------------------------------------------------------------------------------- |
| cardnumber      | String | 16       | Si        | Número de tarjeta                                                                                    |
| cardholdername  | String | 50       | Si        | Nombre del tarjetahabiente                                                                           |
| cvv             | String | 4        | Si        | Código de seguridad CVV2                                                                             |
| cardexpiry      | String | 4        | Si        | MM/AA de vencimiento de tarjeta                                                                      |
| totalamount     | Money  |          | Si        | Monto a procesar                                                                                     |
| reference       | String | 30       | Si        | Referencia única por transacción                                                                     |
| email           | String | 50       | Si        | Correo electrónico del tarjetahabiente                                                               |
| phone           | String | 20       | No        | Teléfono celular del tarjetahabiente                                                                 |
| clientcountry   | String | 2        | Si        | Pais del cliente en formato ISO                                                                      |
| clienturl       | String | 200      | No        | Url del sitio donde se consume el API                                                                |
| transactiontype | String | 3        | Si        | Tipo de transaccion a procesar 200                                                                   |
| sendmail        | int    | 1        | No        | Indica si se debe enviar al cliente (Email) un correo electrónico con el resultado de su transacción |

## 6. Response

```json
{
    "success": true,
    "errorcode": null,
    "errordescription": "",
    "data": {
        "ApprovedCode": "",
        "ProcessCode": "10091",
        "ReferenceCode": "",
        "ResultCode": "05",
        "Description": "Decline - Do not honor",
        "Totalamount": 3.00,
        "Transactiondate": "19/09/2022 14:00:13",
        "Tokenid": "1754DEDCDDD444DCB17263245A2A6D85R9OEPB1YPQ20220919140009"
    }
}
```

::: info Nota
Si la transacción es aprobada el ResultCode será "00". Cualquier otro valor el resultado es rechazado.
:::

## 7. Diccionario de datos response

| Campo            | Tipo     | Longitud | Descripción                                                                                                                        |
| ---------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| success          | Bool     |          | Si la transacción fue procesada o no                                                                                               |
| errorcode        | int32    |          | Tipo de error en caso de que la transacción no fue procesada                                                                       |
| errordescription | String   | 50       | Descripción del error presentado                                                                                                   |
| ApprovedCode     | String   | 50       | Código de aprobación de la transacción                                                                                             |
| ProcessCode      | String   | 50       | Código único devuelto para la transacción                                                                                          |
| ReferenceCode    | String   | 50       | Referencia devuelta para la transacción                                                                                            |
| ResultCode       | String   | 4        | Resultado de la transacción, si el resultado es **00** la transacción fue aprobada, cualquier otro valor la transacción es rechazada |
| Description      | String   | 100      | Descripción del resultado                                                                                                          |
| Totalamount      | Money    |          | Monto procesado en la transacción                                                                                                  |
| Transactiondate  | datetime |          | Fecha y hora de procesamiento                                                                                                      |
| Tokenid          | String   | 200      | Token único por transacción                                                                                                        |

## 8. Data de prueba

### Caso exitoso

| Número             | Mes/año | CVV | Código de respuesta |
| ------------------ | ------- | --- | ------------------- |
| 424242424242424242 | 10/2026 | 999 | 00                  |

### Caso denegado

| Número           | Mes/año | CVV | Código de respuesta |
| ---------------- | ------- | --- | ------------------- |
| 5431111111111111 | 10/2025 | 999 | -99                 |
