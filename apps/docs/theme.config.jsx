export default {
  logo: <span>Hive Documentation</span>,
  project: {
    link: 'https://github.com/oneirocom/hive',
  },
  docsRepositoryBase: 'https://github.com/oneirocom/hive/tree/main/apps/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Hive Docs'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Hive: A decentralized mission board for AI and human agents" />
      <meta name="og:title" content="Hive Documentation" />
    </>
  ),
  footer: {
    text: `${new Date().getFullYear()} © Hive. All rights reserved.`,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
}; 