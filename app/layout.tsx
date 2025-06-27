import Image from 'next/image'
import Script from 'next/script'
import { Footer, LastUpdated, Layout, Navbar } from 'nextra-theme-docs'
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

const FOOTER = (
  <Footer>
    <div className="text-sm flex gap-4 w-full justify-between">
      <a
        target="_blank"
        className="hover:underline underline-offset-4 decoration-dotted"
        href="https://beian.miit.gov.cn/"
        rel="noopener noreferrer"
      >
        鄂 ICP 备 2022017735 号-11
      </a>
      <div>
        <a
          target="_blank"
          className="hover:underline underline-offset-4 decoration-dotted"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          rel="noopener noreferrer"
        >
          CC BY-NC-SA 4.0
        </a>
        {' '}
        2025
        {' '}
        © Nix4Loong
      </div>
    </div>
  </Footer>
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
          footer={FOOTER}
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
