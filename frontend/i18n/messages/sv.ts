import type { Messages } from './en'

const sv: Messages = {
  app: {
    tagline:
      'Skanna en pärmsida för att känna igen dina Magic: The Gathering-kort och slå upp deras priser.'
  },
  nav: {
    language: 'Språk'
  },
  scan: {
    heading: 'Skanna en pärmsida',
    help: 'Ladda upp ett foto av en pärmsida med 9 kort för att dela upp den i kort.',
    fileLabel: 'Pärmfoto',
    process: 'Bearbeta',
    processing: 'Bearbetar…',
    statusProcessing: 'Bearbetar bild…',
    statusDetected: 'Hittade {count} kort.',
    original: 'Original',
    detected: 'Hittade kort ({count})',
    unrecognized: 'Okänt',
    altScanned: 'Skannat kort: {name}',
    altUnrecognized: 'Okänt kort {index}'
  },
  saved: {
    heading: 'Sparade kort',
    empty: 'Inga sparade kort ännu.',
    loading: 'Laddar…',
    error: 'Det gick inte att ladda sparade kort. Körs backenden?'
  }
}

export default sv
