import type { Messages } from './en'

const mt: Messages = {
  app: {
    tagline:
      'Skennja paġna tal-fajl biex tagħraf il-karti tiegħek Magic: The Gathering u tara l-prezzijiet tagħhom.'
  },
  nav: {
    language: 'Lingwa'
  },
  auth: {
    signIn: 'Idħol'
  },
  scan: {
    heading: 'Skennja paġna tal-fajl',
    help: 'Tella’ ritratt ta’ paġna tal-fajl b’9 karti biex taqsamha f’karti.',
    fileLabel: 'Ritratt tal-fajl',
    process: 'Ipproċessa',
    processing: 'Qed jiġi pproċessat…',
    statusProcessing: 'Qed tiġi pproċessata l-immaġni…',
    statusDetected: 'Instabu {count} karti.',
    original: 'Oriġinal',
    detected: 'Karti misjuba ({count})',
    unrecognized: 'Mhux magħrufa',
    altScanned: 'Karta skennjata: {name}',
    altUnrecognized: 'Karta mhux magħrufa {index}',
    save: 'Issejvja',
    saved: 'Issejvjat'
  },
  saved: {
    heading: 'Karti salvati',
    empty: 'Għad m’hemm l-ebda karta salvata.',
    loading: 'Qed jitlgħu…',
    error: 'Ma setgħux jitgħabbew il-karti salvati. Il-backend qiegħed jaħdem?',
    signInPrompt: 'Idħol biex tara l-kollezzjoni tiegħek.'
  }
}

export default mt
