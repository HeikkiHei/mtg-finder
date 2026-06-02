import type { Messages } from './en'

const lt: Messages = {
  app: {
    tagline:
      'Nuskenuokite segtuvo puslapį, kad atpažintumėte savo Magic: The Gathering korteles ir patikrintumėte jų kainas.'
  },
  nav: {
    language: 'Kalba'
  },
  auth: {
    signIn: 'Prisijungti'
  },
  scan: {
    heading: 'Nuskenuoti segtuvo puslapį',
    help: 'Įkelkite 9 kortelių segtuvo puslapio nuotrauką, kad padalytumėte ją į korteles.',
    fileLabel: 'Segtuvo nuotrauka',
    process: 'Apdoroti',
    processing: 'Apdorojama…',
    statusProcessing: 'Apdorojamas vaizdas…',
    statusDetected: 'Aptikta {count} kortelių.',
    original: 'Originalas',
    detected: 'Aptiktos kortelės ({count})',
    unrecognized: 'Neatpažinta',
    altScanned: 'Nuskenuota kortelė: {name}',
    altUnrecognized: 'Neatpažinta kortelė {index}',
    save: 'Išsaugoti',
    saved: 'Išsaugota'
  },
  saved: {
    heading: 'Išsaugotos kortelės',
    empty: 'Kol kas nėra išsaugotų kortelių.',
    loading: 'Įkeliama…',
    error: 'Nepavyko įkelti išsaugotų kortelių. Ar veikia backend’as?',
    signInPrompt: 'Prisijunkite, kad pamatytumėte savo kolekciją.'
  }
}

export default lt
