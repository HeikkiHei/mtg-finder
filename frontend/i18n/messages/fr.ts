import type { Messages } from './en'

const fr: Messages = {
  app: {
    tagline:
      'Scannez une page de classeur pour reconnaître vos cartes Magic: The Gathering et consulter leurs prix.'
  },
  nav: {
    language: 'Langue'
  },
  auth: {
    signIn: 'Se connecter'
  },
  scan: {
    heading: 'Scanner une page de classeur',
    help: 'Téléchargez une photo de cartes disposées en grille (jusqu’à 4×4) et choisissez la disposition ci-dessous. Les emplacements vides sont ignorés.',
    fileLabel: 'Photo du classeur',
    gridLabel: 'Disposition de la grille',
    gridUsed: 'Disposition : {rows}×{cols}',
    process: 'Traiter',
    processing: 'Traitement…',
    statusProcessing: 'Traitement de l’image…',
    statusDetected: '{count} cartes identifiées.',
    original: 'Original',
    detected: 'Cartes identifiées ({count})',
    unidentified: 'Non identifiées ({count}) — non comptées',
    unrecognized: 'Non reconnue',
    altScanned: 'Carte scannée : {name}',
    altUnrecognized: 'Carte non reconnue {index}',
    save: 'Enregistrer',
    saved: 'Enregistré'
  },
  saved: {
    heading: 'Cartes enregistrées',
    empty: 'Aucune carte enregistrée pour le moment.',
    loading: 'Chargement…',
    error:
      'Impossible de charger les cartes enregistrées. Le backend est-il en cours d’exécution ?',
    signInPrompt: 'Connectez-vous pour voir votre collection.'
  }
}

export default fr
