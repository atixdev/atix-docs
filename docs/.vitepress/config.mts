import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Atix Docs",
  description: "Documentación de integración de Atix Payment Gateway",
  // base: "/atix-docs/",  // github repo
  themeConfig: {
    logo: 'https://atix.com.pe/favicon.svg',
    nav: [
      { text: 'APIs', items: [
        { text: 'Venta online', link: '/apis/venta-online' },
        { text: 'Link de Pago', link: '/apis/link-de-pago' },
        { text: 'Pago tarjetas', link: '/apis/pago-tarjetas' },
        { text: 'Devolución', link: '/apis/devolucion' },
      ]},
      { text: 'Plugins', link: '/plugins' },
    ],

    sidebar: [
      {
        text: 'APIs',
        items: [
          { text: 'Venta online', link: '/apis/venta-online' },
          { text: 'Link de Pago', link: '/apis/link-de-pago' },
          { text: 'Pago tarjetas', link: '/apis/pago-tarjetas' },
          { text: 'Devolución', link: '/apis/devolucion' },
        ]
      },
      {
        text: 'Plugins',
        items: [
          { text: 'Links', link: '/plugins/' },
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
