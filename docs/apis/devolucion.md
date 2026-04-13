# Devolución

## 1. Procesar devoluciones de pagos realizados por medio de API

En la presente documentación se detalla el endpoint para procesar devoluciones de pagos realizados.

::: info
Para poder procesar mediante el API de devoluciones, el comercio debe estar certificado con PCI.
:::

## 2. Endpoint

```
https://gateway.atix.com.pe/payment/v1/api/PaymentReturn
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
    "transactiontype": "201",
    "reference": "2020071510",
    "processcodeorig": "214",
    "amount": 1.00,
    "clientip": "64.135.103.202"
}
```

| Campo               | Descripción                                     |
| ------------------- | ----------------------------------------------- |
| `transactiontype`   | Tipo de transacción                             |
| `reference`         | Referencia única para la transacción            |
| `processcodeorig`   | ProcessCode recibido en el response de la venta |
| `amount`            | Monto a devolver                                |
| `clientip`          | IP del cliente                                  |

## 5. Diccionario de datos request

| Campo           | Tipo   | Longitud | Requerido | Descripción                                     |
| --------------- | ------ | -------- | --------- | ----------------------------------------------- |
| processcodeorig | String | 50       | Si        | ProcessCode recibido en el response de la venta |
| amount          | Money  |          | Si        | Monto a procesar                                |
| reference       | String | 30       | Si        | Referencia única por transacción                |
| clientip        | String | 2        | Si        | Ip del cliente                                  |
| transactiontype | String | 3        | Si        | Tipo de transaccion a procesar 201              |

## 6. Response

```json
{
    "success": true,
    "errorcode": null,
    "errordescription": "",
    "data": {
        "ApprovedCode": "000000",
        "ProcessCode": "10022",
        "ResultCode": "00",
        "Description": "",
        "Totalamount": 1.0,
        "Transactiondate": "27/09/2022 20:28:39"
    }
}
```

## 7. Diccionario de datos response

| Campo            | Tipo     | Longitud | Descripción                                                                                                                          |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| success          | Bool     |          | Si la transacción fue procesada o no                                                                                                 |
| errorcode        | int32    |          | Tipo de error en caso de que la transacción no fue procesada                                                                         |
| errordescription | String   | 50       | Descripción del error presentado                                                                                                     |
| ApprovedCode     | String   | 50       | Código de aprobación de la transacción                                                                                               |
| ProcessCode      | String   | 50       | Código único devuelto para la transacción                                                                                            |
| ReferenceCode    | String   | 50       | Referencia devuelta para la transacción                                                                                              |
| ResultCode       | String   | 4        | Resultado de la transacción, si el resultado es **00** la transacción fue aprobada, cualquier otro valor la transacción es rechazada |
| Description      | String   | 100      | Descripción del resultado                                                                                                            |
| Totalamount      | Money    |          | Monto procesado en la transacción                                                                                                    |
| Transactiondate  | datetime |          | Fecha y hora de procesamiento                                                                                                        |

## 8. Consideraciones

Para realizar pruebas en el ambiente de sandbox, la transacción de venta debe realizarse con el número de tarjeta de prueba `4242424242424242`, de esta manera la devolución responderá aprobado. La transacción con otra tarjeta, la devolución dará como resultado rechazada.
