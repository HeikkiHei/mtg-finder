import type { Messages } from './en'

const it: Messages = {
  app: {
    tagline:
      'Scansiona una pagina del raccoglitore per riconoscere le tue carte Magic: The Gathering e consultarne i prezzi.'
  },
  nav: {
    language: 'Lingua'
  },
  auth: {
    signIn: 'Accedi'
  },
  scan: {
    heading: 'Scansiona una pagina del raccoglitore',
    help: 'Carica una foto di una pagina del raccoglitore con 9 carte per dividerla in carte.',
    fileLabel: 'Foto del raccoglitore',
    process: 'Elabora',
    processing: 'Elaborazione…',
    statusProcessing: 'Elaborazione dell’immagine…',
    statusDetected: 'Rilevate {count} carte.',
    original: 'Originale',
    detected: 'Carte rilevate ({count})',
    unrecognized: 'Non riconosciuta',
    altScanned: 'Carta scansionata: {name}',
    altUnrecognized: 'Carta non riconosciuta {index}',
    save: 'Salva',
    saved: 'Salvato'
  },
  saved: {
    heading: 'Carte salvate',
    empty: 'Ancora nessuna carta salvata.',
    loading: 'Caricamento…',
    error: 'Impossibile caricare le carte salvate. Il backend è in esecuzione?',
    signInPrompt: 'Accedi per vedere la tua collezione.'
  }
}

export default it
