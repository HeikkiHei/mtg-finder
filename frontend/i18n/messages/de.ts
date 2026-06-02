import type { Messages } from './en'

const de: Messages = {
  app: {
    tagline:
      'Scanne eine Albumseite, um deine Magic: The Gathering-Karten zu erkennen und ihre Preise nachzuschlagen.'
  },
  nav: {
    language: 'Sprache'
  },
  auth: {
    signIn: 'Anmelden'
  },
  scan: {
    heading: 'Albumseite scannen',
    help: 'Lade ein Foto von Karten in einem Raster (bis zu 4×4) hoch und wähle unten das Layout. Leere Plätze werden übersprungen.',
    fileLabel: 'Albumfoto',
    gridLabel: 'Rasterlayout',
    gridUsed: 'Layout: {rows}×{cols}',
    process: 'Verarbeiten',
    processing: 'Wird verarbeitet…',
    statusProcessing: 'Bild wird verarbeitet…',
    statusDetected: '{count} Karten erkannt.',
    original: 'Original',
    detected: 'Erkannte Karten ({count})',
    unidentified: 'Nicht erkannt ({count}) — nicht gezählt',
    unrecognized: 'Nicht erkannt',
    altScanned: 'Gescannte Karte: {name}',
    altUnrecognized: 'Nicht erkannte Karte {index}',
    save: 'Speichern',
    saved: 'Gespeichert'
  },
  saved: {
    heading: 'Gespeicherte Karten',
    empty: 'Noch keine gespeicherten Karten.',
    loading: 'Wird geladen…',
    error: 'Gespeicherte Karten konnten nicht geladen werden. Läuft das Backend?',
    signInPrompt: 'Melde dich an, um deine Sammlung zu sehen.'
  }
}

export default de
