import type { Messages } from './en'

const sv: Messages = {
  app: {
    tagline:
      'Skanna en pärmsida för att känna igen dina Magic: The Gathering-kort och slå upp deras priser.'
  },
  nav: {
    language: 'Språk'
  },
  auth: {
    signIn: 'Logga in'
  },
  scan: {
    heading: 'Skanna en pärmsida',
    help: 'Ladda upp ett foto av kort upplagda i ett rutnät (upp till 4×4) och välj layouten nedan. Tomma platser hoppas över.',
    fileLabel: 'Pärmfoto',
    gridLabel: 'Rutnätslayout',
    gridUsed: 'Layout: {rows}×{cols}',
    process: 'Bearbeta',
    processing: 'Bearbetar…',
    statusProcessing: 'Bearbetar bild…',
    statusDetected: 'Hittade {count} kort.',
    original: 'Original',
    detected: 'Hittade kort ({count})',
    unidentified: 'Kunde inte identifieras ({count}) — räknas inte',
    unrecognized: 'Okänt',
    altScanned: 'Skannat kort: {name}',
    altUnrecognized: 'Okänt kort {index}',
    save: 'Spara',
    saved: 'Sparad'
  },
  saved: {
    heading: 'Sparade kort',
    empty: 'Inga sparade kort ännu.',
    loading: 'Laddar…',
    error: 'Det gick inte att ladda sparade kort. Körs backenden?',
    signInPrompt: 'Logga in för att se din samling.'
  }
}

export default sv
