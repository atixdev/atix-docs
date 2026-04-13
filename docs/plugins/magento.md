# Plugin Magento

## Introducción

Este módulo permite realizar pagos en Magento, mediante la pasarela de pagos de [Atix](https://atix.com.pe/).

## Requerimientos

Es necesario que el servidor donde se encuentre alojada su tienda de Magento tenga las siguientes características:

1. Magento v2.4 o superior.
2. PHP v8.2 o superior.
3. Composer 2.5 o superior.

## Instalación

Para la instalación es necesario seguir los siguientes pasos:

1. Descargar el archivo ZIP con el plugin desde el portal de Atix.

2. Conectarse al servidor donde tenemos la tienda, por SSH o SFTP, y llevar el plugin.

3. Dirigirse a la carpeta de la tienda de Magento dentro del servidor.

4. Descomprimir el plugin con:
   ```bash
   unzip atix_payment_gateway_(version).zip
   ```
   Mover la carpeta `Atix` dentro de la carpeta `app/code` de la tienda. Si la carpeta no existe, crearla.

5. En el terminal ejecutar los comandos para compilar y refrescar los módulos:

   ```bash
   php bin/magento setup:upgrade

   php bin/magento setup:di:compile

   php bin/magento setup:static-content:deploy -f
   ```

6. Verificar el estado y habilitar el plugin:

   ```bash
   php bin/magento module:status Atix_PaymentGateway

   php bin/magento module:enable Atix_PaymentGateway --clear-static-content

   # Refrescar el cache
   php bin/magento cache:clean

   php bin/magento cache:flush
   ```

7. En Magento en la sección de administración, ir a **STORES > Configuration > SALES > Payment Methods > OTHER PAYMENT METHODS**.

8. Buscar el método de pago **Pasarela de pago Atix** o en inglés **Atix Payment Gateway**.

9. Verificar que el plugin esté **Activado**. Si no, marcar el check `Use system value`, deslizar la opción, seleccionar `Yes` y guardar el cambio.

10. Ya puede realizar la configuración del módulo.

## Configuración

1. En la sección **STORES > Configuration > SALES > Payment Methods > OTHER PAYMENT METHODS**, buscar el método de pago **Atix Payment Gateway**.

2. En el formulario de configuración, ingresar el **API KEY PEN** o **API KEY USD**, dependiendo del tipo de moneda de la tienda.

3. Ingresar el **URL de la tienda** de Magento, ejemplo: `https://mitienda.com`.

4. Dar clic en el botón **Save Config**.

::: info Modo prueba
Si el campo `Modo prueba o Debug` tiene el valor `Yes`, se está en modo **Sandbox**. Si el valor es `No`, se está en modo **Producción**.
:::

## Plataforma de Atix Payment Gateway

1. Para obtener el **API KEY**, en la sección de **Mi Cuenta > Datos de la cuenta > Configuración > API Key**. Lo copiamos e ingresamos en la configuración del plugin, dependiendo el tipo de moneda.

2. Para cambiar las **Url's de redirección**, en la sección de **Mi Cuenta > Datos de la cuenta > Configuración > Url's de respuesta**. Ingresamos en el campo de Redirección de transacciones aprobada y rechazada. Por último, guardamos la configuración.

Ejemplo de URL de redirección:

```
https://mitienda.com/atixpaymentgateway/payment/confirmation?tk={{{tokenid}}}
```

::: info Nota
Es recomendable reemplazar el dominio de la tienda como: `https://mitienda.com`, para no tener un problema al verificar y confirmar el pago.
:::

Ahora ya podemos usar el módulo de pasarela de pagos de Atix en tu tienda.
