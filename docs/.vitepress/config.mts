import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Atix Docs",
  description: "Documentación de integración de Atix Payment Gateway",
  themeConfig: {
    logo: 'https://atix.com.pe/favicon.svg',
    nav: [
      { text: 'APIs', items: [
        { text: 'Venta online', link: '/apis/venta-online' },
        { text: 'Devolución', link: '/apis/devolucion' },
        { text: 'Link de Pago', link: '/apis/link-de-pago' },
        { text: 'Pago tarjetas', link: '/apis/pago-tarjetas' },
      ]},
      { text: 'Plugins', items: [
        { text: 'WooCommerce', link: '/plugins/woocommerce' },
        { text: 'PrestaShop', link: '/plugins/prestashop' },
        { text: 'Magento', link: '/plugins/magento' },
      ]},
    ],

    sidebar: [
      {
        text: 'APIs',
        items: [
          { text: 'Venta online', link: '/apis/venta-online' },
          { text: 'Devolución', link: '/apis/devolucion' },
          { text: 'Link de Pago', link: '/apis/link-de-pago' },
          { text: 'Pago tarjetas', link: '/apis/pago-tarjetas' },
        ]
      },
      {
        text: 'Plugins',
        items: [
          { text: 'WooCommerce', link: '/plugins/woocommerce' },
          { text: 'Prestashop', link: '/plugins/prestashop' },
          { text: 'Magento', link: '/plugins/magento' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/atixdev' }
    ],

    footer: {
      message: 'Atix Payment Gateway Documentation',
      copyright: 'Copyright © 2026 Atix'
    }
  }
})
