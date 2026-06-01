import type { Messages } from './en'

const lv: Messages = {
  app: {
    tagline:
      'Skenējiet mapes lapu, lai atpazītu savas Magic: The Gathering kārtis un uzzinātu to cenas.'
  },
  nav: {
    language: 'Valoda'
  },
  scan: {
    heading: 'Skenēt mapes lapu',
    help: 'Augšupielādējiet 9 kāršu mapes lapas fotoattēlu, lai sadalītu to kārtīs.',
    fileLabel: 'Mapes fotoattēls',
    process: 'Apstrādāt',
    processing: 'Apstrādā…',
    statusProcessing: 'Apstrādā attēlu…',
    statusDetected: 'Atrastas {count} kārtis.',
    original: 'Oriģināls',
    detected: 'Atrastās kārtis ({count})',
    unrecognized: 'Neatpazīta',
    altScanned: 'Skenēta kārts: {name}',
    altUnrecognized: 'Neatpazīta kārts {index}'
  },
  saved: {
    heading: 'Saglabātās kārtis',
    empty: 'Vēl nav saglabātu kāršu.',
    loading: 'Ielādē…',
    error: 'Neizdevās ielādēt saglabātās kārtis. Vai backend darbojas?'
  }
}

export default lv
