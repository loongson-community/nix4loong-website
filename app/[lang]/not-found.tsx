import Image from 'next/image'
import { NotFoundPage } from 'nextra-theme-docs'
import { mustAccessI18N } from '../_utils/i18n'
import logo from '../icon.svg'

interface NotFoundProps {
  params: Promise<{ lang: string }>
}

export default async function NotFound({ params }: NotFoundProps) {
  const i18n = mustAccessI18N((await params)?.lang ?? 'en')
  return (
    <NotFoundPage content={i18n['not-found.submit-issue']} labels="broken-link">
      <Image
        src={logo}
        width={180}
        height={180}
        className="mb-4"
        alt="Nix4Loong Logo"
      />
      <strong className="text-2xl">{i18n['not-found.caption']}</strong>
    </NotFoundPage>
  )
}
