import type { Messages } from './en'

const nl: Messages = {
  app: {
    tagline:
      'Scan een mappagina om je Magic: The Gathering-kaarten te herkennen en hun prijzen op te zoeken.'
  },
  nav: {
    language: 'Taal'
  },
  auth: {
    signIn: 'Inloggen'
  },
  scan: {
    heading: 'Een mappagina scannen',
    help: 'Upload een foto van een mappagina met 9 kaarten om die in kaarten te splitsen.',
    fileLabel: 'Mapfoto',
    process: 'Verwerken',
    processing: 'Bezig met verwerken…',
    statusProcessing: 'Afbeelding wordt verwerkt…',
    statusDetected: '{count} kaarten gedetecteerd.',
    original: 'Origineel',
    detected: 'Gedetecteerde kaarten ({count})',
    unrecognized: 'Niet herkend',
    altScanned: 'Gescande kaart: {name}',
    altUnrecognized: 'Niet-herkende kaart {index}',
    save: 'Opslaan',
    saved: 'Opgeslagen'
  },
  saved: {
    heading: 'Opgeslagen kaarten',
    empty: 'Nog geen opgeslagen kaarten.',
    loading: 'Laden…',
    error: 'Kan opgeslagen kaarten niet laden. Draait de backend?',
    signInPrompt: 'Log in om je collectie te zien.'
  }
}

export default nl
