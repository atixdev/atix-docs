import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Atix Docs",
  description: "Documentación de integración de Atix Payment Gateway",
  // base: "/atix-docs/",  // github repo
  themeConfig: {
    logo: 'https://atix.com.pe/favicon.svg',

    sidebar: [
      {
        text: 'Comercio electrónico',
        items: [
          { text: 'Venta online', link: '/ecommerce/venta-online' },
          { text: 'Consulta', link: '/ecommerce/consulta' },
          { text: 'Link de Pago', link: '/ecommerce/link-de-pago' },
        ]
      },
      {
        text: 'APIs',
        items: [
          { text: 'Pago QR', link: '/apis/qr' },
          { text: 'Consulta', link: '/apis/consulta' },
        ]
      },
      { text: 'Plugins', link: '/plugins' },
      { text: 'Webhook', link: '/webhook' },
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
