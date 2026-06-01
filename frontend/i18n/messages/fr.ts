import type { Messages } from './en'

const fr: Messages = {
  app: {
    tagline:
      'Scannez une page de classeur pour reconnaître vos cartes Magic: The Gathering et consulter leurs prix.'
  },
  nav: {
    language: 'Langue'
  },
  scan: {
    heading: 'Scanner une page de classeur',
    help: 'Téléversez une photo d’une page de classeur de 9 cartes pour la diviser en cartes.',
    fileLabel: 'Photo du classeur',
    process: 'Traiter',
    processing: 'Traitement…',
    statusProcessing: 'Traitement de l’image…',
    statusDetected: '{count} cartes détectées.',
    original: 'Original',
    detected: 'Cartes détectées ({count})',
    unrecognized: 'Non reconnue',
    altScanned: 'Carte scannée : {name}',
    altUnrecognized: 'Carte non reconnue {index}'
  },
  saved: {
    heading: 'Cartes enregistrées',
    empty: 'Aucune carte enregistrée pour le moment.',
    loading: 'Chargement…',
    error: 'Impossible de charger les cartes enregistrées. Le backend est-il en cours d’exécution ?'
  }
}

export default fr
