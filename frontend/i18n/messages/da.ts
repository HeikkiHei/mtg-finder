import type { Messages } from './en'

const da: Messages = {
  app: {
    tagline:
      'Scan en mappeside for at genkende dine Magic: The Gathering-kort og slå deres priser op.'
  },
  nav: {
    language: 'Sprog'
  },
  scan: {
    heading: 'Scan en mappeside',
    help: 'Upload et foto af en mappeside med 9 kort for at opdele den i kort.',
    fileLabel: 'Mappefoto',
    process: 'Behandl',
    processing: 'Behandler…',
    statusProcessing: 'Behandler billede…',
    statusDetected: 'Fandt {count} kort.',
    original: 'Original',
    detected: 'Fundne kort ({count})',
    unrecognized: 'Ikke genkendt',
    altScanned: 'Scannet kort: {name}',
    altUnrecognized: 'Ikke-genkendt kort {index}'
  },
  saved: {
    heading: 'Gemte kort',
    empty: 'Ingen gemte kort endnu.',
    loading: 'Indlæser…',
    error: 'Kunne ikke indlæse gemte kort. Kører backenden?'
  }
}

export default da
