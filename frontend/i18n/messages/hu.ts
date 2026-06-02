import type { Messages } from './en'

const hu: Messages = {
  app: {
    tagline:
      'Szkennelj be egy albumoldalt, hogy felismerd a Magic: The Gathering kártyáidat, és megnézd az áraikat.'
  },
  nav: {
    language: 'Nyelv'
  },
  auth: {
    signIn: 'Bejelentkezés'
  },
  scan: {
    heading: 'Albumoldal beolvasása',
    help: 'Tölts fel egy fotót rácsba rendezett kártyákról (legfeljebb 4×4), és válaszd ki lent az elrendezést. Az üres helyek kimaradnak.',
    fileLabel: 'Albumfotó',
    gridLabel: 'Rács elrendezése',
    gridUsed: 'Elrendezés: {rows}×{cols}',
    process: 'Feldolgozás',
    processing: 'Feldolgozás…',
    statusProcessing: 'Kép feldolgozása…',
    statusDetected: '{count} kártya felismerve.',
    original: 'Eredeti',
    detected: 'Felismert kártyák ({count})',
    unidentified: 'Nem azonosítható ({count}) — nincs beleszámítva',
    unrecognized: 'Nem felismert',
    altScanned: 'Beolvasott kártya: {name}',
    altUnrecognized: 'Nem felismert kártya {index}',
    save: 'Mentés',
    saved: 'Mentve'
  },
  saved: {
    heading: 'Mentett kártyák',
    empty: 'Még nincsenek mentett kártyák.',
    loading: 'Betöltés…',
    error: 'A mentett kártyákat nem sikerült betölteni. Fut a backend?',
    signInPrompt: 'Jelentkezz be a gyűjteményed megtekintéséhez.'
  }
}

export default hu
