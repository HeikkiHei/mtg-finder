import type { Messages } from './en'

const da: Messages = {
  app: {
    tagline:
      'Scan en mappeside for at genkende dine Magic: The Gathering-kort og slå deres priser op.'
  },
  nav: {
    language: 'Sprog'
  },
  auth: {
    signIn: 'Log ind'
  },
  scan: {
    heading: 'Scan en mappeside',
    help: 'Upload et foto af kort lagt ud i et gitter (op til 4×4), og vælg layoutet nedenfor. Tomme felter springes over.',
    fileLabel: 'Mappefoto',
    gridLabel: 'Gitterlayout',
    gridUsed: 'Layout: {rows}×{cols}',
    process: 'Behandl',
    processing: 'Behandler…',
    statusProcessing: 'Behandler billede…',
    statusDetected: 'Fandt {count} kort.',
    original: 'Original',
    detected: 'Fundne kort ({count})',
    unrecognized: 'Ikke genkendt',
    altScanned: 'Scannet kort: {name}',
    altUnrecognized: 'Ikke-genkendt kort {index}',
    save: 'Gem',
    saved: 'Gemt'
  },
  saved: {
    heading: 'Gemte kort',
    empty: 'Ingen gemte kort endnu.',
    loading: 'Indlæser…',
    error: 'Kunne ikke indlæse gemte kort. Kører backenden?',
    signInPrompt: 'Log ind for at se din samling.'
  }
}

export default da
