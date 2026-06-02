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
    help: 'Lade ein Foto einer Albumseite mit 9 Karten hoch, um sie in einzelne Karten zu zerlegen.',
    fileLabel: 'Albumfoto',
    process: 'Verarbeiten',
    processing: 'Wird verarbeitet…',
    statusProcessing: 'Bild wird verarbeitet…',
    statusDetected: '{count} Karten erkannt.',
    original: 'Original',
    detected: 'Erkannte Karten ({count})',
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
