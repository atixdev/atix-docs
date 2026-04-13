# Plugin PrestaShop

## Introducción

Este módulo permite realizar pagos en Prestashop, mediante la pasarela de pagos de [Atix](https://atix.com.pe/).

## Requerimientos

Es necesario que el servidor donde se encuentre alojada su tienda de Prestashop cuente con las siguientes características:

- Versión instalada de Prestashop V1.7 o superior.

## Instalación

1. Descargar el archivo ZIP con el plugin desde el portal de Atix.

2. En Prestashop en la página de administración, ubíquese dentro del menú lateral en **Mejoras → Módulos → Administrador de módulos**.

3. Dar clic en la opción **Subir módulo**, ubicado en la parte superior derecha de la pantalla.

4. Ubicar el archivo ZIP descargado en el paso 1 y seleccionarlo o arrastrarlo al formulario.

5. Confirmar que el plugin haya sido instalado correctamente y verificar si está habilitado o activado el módulo. Si no lo está, deslizar las opciones al costado del botón **Configurar** y habilitarlo.

## Configuración

1. En Prestashop en la página de administración, ubíquese dentro del menú lateral en **Mejoras → Módulos → Administrador de módulos**.

2. Buscar el módulo **Pasarela de Pagos Atix** o en inglés **Atix Payment Gateway**. Luego dar clic en el botón **Configurar**.

3. Puede llenar los valores de **Título**, **Descripción** e **Instrucciones** con los valores que desee que el usuario vea.

4. El valor del campo **API Key PEN** o **API Key USD** debe ser llenado con el valor proporcionado al darse de alta en el servicio. También dependerá del tipo de moneda de la tienda.

5. Presionar el botón **Guardar los cambios**.

::: warning Importante
Si estás usando en la tienda el tipo de moneda de dólares USD, verifica que esté **habilitado** en la sección de **Restricciones de monedas**.

Dirígete a **Pago > Preferencias > Restricciones de monedas**. Luego, marca el check de **Dólar estadounidense (USD)** correspondiente al plugin de **Pasarela de Pagos Atix** y guarda.
:::

## Plataforma de Atix Payment Gateway

1. Para obtener el **API KEY**, en la sección de **Mi Cuenta > Datos de la cuenta > Configuración > API Key**. Lo copiamos e ingresamos en la configuración del plugin, dependiendo el tipo de moneda.

2. Para cambiar las **Url's de redirección**, en la sección de **Mi Cuenta > Datos de la cuenta > Configuración > Url's de respuesta**. Ingresamos en el campo de Redirección de transacciones aprobada y rechazada. Por último, guardamos la configuración.

Ejemplo de URL de redirección:

```
https://mitienda.com/es/module/atix_payment/confirmation?tk={{{tokenid}}}
```

::: info Nota
Es recomendable reemplazar el dominio de la tienda como: `https://mitienda.com/es`, para no tener un problema al verificar y confirmar el pago.
:::

Ahora ya podemos usar el módulo de pasarela de pagos de Atix en tu tienda.
