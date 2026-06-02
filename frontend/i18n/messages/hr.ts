import type { Messages } from './en'

const hr: Messages = {
  app: {
    tagline:
      'Skenirajte stranicu albuma kako biste prepoznali svoje Magic: The Gathering karte i provjerili njihove cijene.'
  },
  nav: {
    language: 'Jezik'
  },
  auth: {
    signIn: 'Prijava'
  },
  scan: {
    heading: 'Skeniraj stranicu albuma',
    help: 'Prenesite fotografiju karata posloženih u mrežu (do 4×4) i odaberite raspored u nastavku. Prazna mjesta se preskaču.',
    fileLabel: 'Fotografija albuma',
    gridLabel: 'Raspored mreže',
    gridUsed: 'Raspored: {rows}×{cols}',
    process: 'Obradi',
    processing: 'Obrađuje se…',
    statusProcessing: 'Obrada slike…',
    statusDetected: 'Prepoznato {count} karata.',
    original: 'Original',
    detected: 'Prepoznate karte ({count})',
    unidentified: 'Neprepoznato ({count}) — ne broji se',
    unrecognized: 'Neprepoznato',
    altScanned: 'Skenirana karta: {name}',
    altUnrecognized: 'Neprepoznata karta {index}',
    save: 'Spremi',
    saved: 'Spremljeno'
  },
  saved: {
    heading: 'Spremljene karte',
    empty: 'Još nema spremljenih karata.',
    loading: 'Učitavanje…',
    error: 'Spremljene karte nije moguće učitati. Radi li backend?',
    signInPrompt: 'Prijavite se da vidite svoju zbirku.'
  }
}

export default hr
