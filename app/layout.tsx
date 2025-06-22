import Image from 'next/image'
import Script from 'next/script'
import { LastUpdated, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import icon from './icon.svg'
import './globals.css'

export const metadata = {}

const NAVBAR = (
  <Navbar
    projectLink="https://github.com/loongson-community/nixpkgs"
    logo={(
      <div className="flex items-center gap-2">
        <Image src={icon} width={32} height={32} alt="" />
        <b>Nix4Loong</b>
      </div>
    )}
  />
)

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="zh"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head>
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="832"
          strategy="afterInteractive"
        />
      </Head>
      <body className="overscroll-y-none">
        <Layout
          pageMap={await getPageMap()}
          navbar={NAVBAR}
          editLink={null}
          feedback={{ content: null }}
          search={null}
          lastUpdated={(
            <LastUpdated>
              最近更新于
            </LastUpdated>
          )}
          toc={{
            title: '目录',
            backToTop: '回到顶部',
          }}
          themeSwitch={{
            dark: '黑暗模式',
            light: '明亮模式',
            system: '跟随系统',
          }}
          docsRepositoryBase="https://github.com/loongson-community/nix4loong-website"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
