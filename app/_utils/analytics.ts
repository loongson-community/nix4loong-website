// Type definitions for Rybbit analytics
interface RybbitEventProperties {
  [key: string]: string | number | undefined
}

interface DownloadEventProperties extends RybbitEventProperties {
  type: 'graphical' | 'minimal'
  file: 'iso' | 'sha256'
  version?: string
}

// Check if Rybbit is available
export function isRybbitAvailable(): boolean {
  return typeof window !== 'undefined' && window.rybbit !== undefined
}

// Track download events
export function trackDownload(properties: DownloadEventProperties): void {
  if (!isRybbitAvailable()) {
    console.warn('Rybbit analytics not available')
    return
  }

  window.rybbit.event('Download Click', {
    type: properties.type,
    file: properties.file,
    version: properties.version || 'latest',
  })
}

// Track generic events
export function trackEvent(eventName: string, properties?: RybbitEventProperties): void {
  if (!isRybbitAvailable()) {
    console.warn('Rybbit analytics not available')
    return
  }

  window.rybbit.event(eventName, properties)
}
