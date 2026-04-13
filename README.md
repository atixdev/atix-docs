# atix-docs

Source code for the [Atix Payment Gateway](https://atix.com.pe/) integration documentation site.

## Tech Stack

- [VitePress](https://vitepress.dev/) v1.x — static site generator
- [pnpm](https://pnpm.io/) — package manager

## Project Structure

```
docs/
├── .vitepress/
│   └── config.mts       # Site config: nav, sidebar, theme
├── apis/
│   ├── venta-online.md
│   ├── pago-tarjetas.md
│   ├── link-de-pago.md
│   └── devolucion.md
├── plugin-woocommerce/
│   ├── index.md
│   └── changelog.md
├── plugin-prestashop/
│   ├── index.md
│   └── changelog.md
├── plugin-magento/
│   ├── index.md
│   └── changelog.md
└── index.md             # Redirects to /apis/venta-online
package.json
pnpm-lock.yaml
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

### Commands

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Start local dev server at `localhost:5173` |
| `pnpm build`   | Build static site to `docs/.vitepress/dist` |
| `pnpm preview` | Preview the production build locally     |

## Adding or Editing Documentation

All content lives inside the `docs/` directory as Markdown files.

- **API docs** → `docs/apis/`
- **Plugin docs** → `docs/plugin-<name>/`

To add a new page, create a `.md` file in the appropriate folder and register it in `docs/.vitepress/config.mts` under both `nav` and `sidebar`.

VitePress supports standard Markdown plus custom containers:

```md
::: info
Informational note
:::

::: warning
Warning note
:::
```

## Navigation Config

The site navigation is defined in `docs/.vitepress/config.mts`. Update this file when adding new sections or pages.

## Build Output

The production build is generated in `docs/.vitepress/dist/`. This folder is not committed to the repository.
