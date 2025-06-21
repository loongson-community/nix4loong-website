import Image from 'next/image'
import { NotFoundPage } from 'nextra-theme-docs'
import logo from './icon.svg'

export default function NotFound() {
  return (
    <NotFoundPage content="提交 issue" labels="broken-link">
      <Image
        src={logo}
        width={180}
        height={180}
        className="mb-4"
        alt="Nix4Loong Logo"
      />
      <strong className="text-2xl">页面不存在</strong>
    </NotFoundPage>
  )
}
