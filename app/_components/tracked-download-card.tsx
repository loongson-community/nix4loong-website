import type { ReactElement } from 'react'
import { Cards } from 'nextra/components'

interface TrackedDownloadCardProps {
  icon: ReactElement
  title: string
  href: string
  className?: string
  downloadType: 'graphical' | 'minimal'
  fileType: 'iso' | 'sha256'
}

export function TrackedDownloadCard({
  icon,
  title,
  href,
  className,
  downloadType,
  fileType,
}: TrackedDownloadCardProps) {
  return (
    <div
      data-rybbit-event="download_click"
      data-rybbit-prop-type={downloadType}
      data-rybbit-prop-file={fileType}
    >
      <Cards.Card
        icon={icon}
        title={title}
        href={href}
        className={className}
      />
    </div>
  )
}
