import nextra from 'nextra'

const withNextra = nextra({
  unstable_shouldAddLocaleToLinks: true,
})

export default withNextra({
  output: 'export',
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
  },
})
