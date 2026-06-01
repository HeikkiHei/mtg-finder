import type { Messages } from './en'

const et: Messages = {
  app: {
    tagline:
      'Skanni mapilehekülg, et tuvastada oma Magic: The Gathering kaardid ja vaadata nende hindu.'
  },
  nav: {
    language: 'Keel'
  },
  scan: {
    heading: 'Skanni mapilehekülg',
    help: 'Laadi üles foto 9 kaardiga mapileheküljest, et jagada see kaartideks.',
    fileLabel: 'Mapi foto',
    process: 'Töötle',
    processing: 'Töötlemine…',
    statusProcessing: 'Pildi töötlemine…',
    statusDetected: 'Tuvastati {count} kaarti.',
    original: 'Originaal',
    detected: 'Tuvastatud kaardid ({count})',
    unrecognized: 'Tuvastamata',
    altScanned: 'Skannitud kaart: {name}',
    altUnrecognized: 'Tuvastamata kaart {index}'
  },
  saved: {
    heading: 'Salvestatud kaardid',
    empty: 'Salvestatud kaarte veel pole.',
    loading: 'Laadimine…',
    error: 'Salvestatud kaarte ei õnnestunud laadida. Kas backend töötab?'
  }
}

export default et
