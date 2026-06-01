import type { Messages } from './en'

const hu: Messages = {
  app: {
    tagline:
      'Szkennelj be egy albumoldalt, hogy felismerd a Magic: The Gathering kártyáidat, és megnézd az áraikat.'
  },
  nav: {
    language: 'Nyelv'
  },
  scan: {
    heading: 'Albumoldal beolvasása',
    help: 'Tölts fel egy fotót egy 9 kártyás albumoldalról, hogy kártyákra bontsd.',
    fileLabel: 'Albumfotó',
    process: 'Feldolgozás',
    processing: 'Feldolgozás…',
    statusProcessing: 'Kép feldolgozása…',
    statusDetected: '{count} kártya felismerve.',
    original: 'Eredeti',
    detected: 'Felismert kártyák ({count})',
    unrecognized: 'Nem felismert',
    altScanned: 'Beolvasott kártya: {name}',
    altUnrecognized: 'Nem felismert kártya {index}'
  },
  saved: {
    heading: 'Mentett kártyák',
    empty: 'Még nincsenek mentett kártyák.',
    loading: 'Betöltés…',
    error: 'A mentett kártyákat nem sikerült betölteni. Fut a backend?'
  }
}

export default hu
