# Plugin WooCommerce

## Introducción

WooCommerce es un plugin para sitios basados en WordPress que le permite a sus usuarios convertirlos en comercios electrónicos de manera fácil y rápida.

## Versiones Soportadas

- WordPress 4.9 en adelante
- Plugin WooCommerce 3.4.3 en adelante

## Requerimientos

Es necesario que el servidor donde se encuentre alojada su tienda de WordPress cuente con las siguientes características:

- Versión instalada de PHP 5.5 o mayor.
- Versión instalada de WordPress 4.9 o mayor.
- Extensión de PHP CURL habilitada.
- Versión instalada del plugin WooCommerce 3.4.3 en adelante.

## Instalación

Para la instalación es necesario seguir los siguientes pasos:

1. Descargar el archivo ZIP con el plugin desde el portal de Atix.

2. En su panel de administración de WordPress, dirigirse a la sección **Plugins → Añadir nuevo**, ubicado en el menú lateral.

3. Dar clic en la opción **Subir Plugin**, ubicado en la parte superior de la pantalla.

4. Ubicar el archivo ZIP descargado en el paso 1 y proporcionarlo al formulario de instalación de plugins. Dar clic en el botón **Instalar Ahora**.

5. Confirmar que el plugin haya sido instalado correctamente y presionar **Activar Plugin**.

## Configuración

1. En su panel de administración de WordPress, dirigirse a la sección **Plugins → Plugins instalados**, ubicado en el menú lateral.

2. Buscar el plugin **Atix Pasarela de pago para WooCommerce** y dar click en **Configurar**.

3. El valor del campo **API Key SOLES** y **DOLARES** deben ser llenados con el valor proporcionado al darse de alta en el servicio.

4. Presionar el botón **Guardar los cambios**.

## Plataforma de Atix Payment Gateway

1. Para obtener el **API KEY**, en la sección de **Mi Cuenta > Datos de la cuenta > Configuración > API Key**. Lo copiamos e ingresamos en la configuración del plugin, dependiendo el tipo de moneda.

2. Para cambiar las **Url's de redirección**, en la sección de **Mi Cuenta > Datos de la cuenta > Configuración > Url's de respuesta**. Ingresamos en el campo de Redirección de transacciones aprobada y rechazada. Por último, guardamos la configuración.

Ejemplo de URL de redirección:

```
https://mitienda.com/atixpaymentgateway/confirmation?tk={{{tokenid}}}
```

::: info Nota
Es recomendable reemplazar el dominio de la tienda como: `https://mitienda.com`, para no tener un problema al verificar y confirmar el pago.
:::

Ahora ya podemos usar el módulo de pasarela de pagos de Atix en tu tienda.
