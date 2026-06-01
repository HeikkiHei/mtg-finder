import type { Messages } from './en'

const hr: Messages = {
  app: {
    tagline:
      'Skenirajte stranicu albuma kako biste prepoznali svoje Magic: The Gathering karte i provjerili njihove cijene.'
  },
  nav: {
    language: 'Jezik'
  },
  scan: {
    heading: 'Skeniraj stranicu albuma',
    help: 'Učitajte fotografiju stranice albuma s 9 karata da biste je podijelili na karte.',
    fileLabel: 'Fotografija albuma',
    process: 'Obradi',
    processing: 'Obrađuje se…',
    statusProcessing: 'Obrada slike…',
    statusDetected: 'Pronađeno {count} karata.',
    original: 'Original',
    detected: 'Pronađene karte ({count})',
    unrecognized: 'Neprepoznato',
    altScanned: 'Skenirana karta: {name}',
    altUnrecognized: 'Neprepoznata karta {index}'
  },
  saved: {
    heading: 'Spremljene karte',
    empty: 'Još nema spremljenih karata.',
    loading: 'Učitavanje…',
    error: 'Spremljene karte nije moguće učitati. Radi li backend?'
  }
}

export default hr
