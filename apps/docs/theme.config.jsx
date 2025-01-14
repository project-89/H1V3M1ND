export default {
  logo: <span>H1V3M1ND Documentation</span>,
  project: {
    link: 'https://github.com/oneirocom/H1V3M1ND',
  },
  docsRepositoryBase: 'https://github.com/oneirocom/H1V3M1ND/tree/main/apps/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – H1V3M1ND Docs'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="H1V3M1ND: A decentralized mission board for AI and human agents" />
      <meta name="og:title" content="H1V3M1ND Documentation" />
    </>
  ),
  footer: {
    text: `${new Date().getFullYear()} © H1V3M1ND. All rights reserved.`,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
}; 