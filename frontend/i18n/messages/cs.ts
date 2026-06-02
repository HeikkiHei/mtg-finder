import type { Messages } from './en'

const cs: Messages = {
  app: {
    tagline:
      'Naskenujte stránku z alba a rozpoznejte své karty Magic: The Gathering a zjistěte jejich ceny.'
  },
  nav: {
    language: 'Jazyk'
  },
  auth: {
    signIn: 'Přihlásit'
  },
  scan: {
    heading: 'Naskenovat stránku z alba',
    help: 'Nahrajte fotku karet uspořádaných do mřížky (až 4×4) a níže zvolte rozložení. Prázdná místa se přeskočí.',
    fileLabel: 'Fotka alba',
    gridLabel: 'Rozložení mřížky',
    gridUsed: 'Rozložení: {rows}×{cols}',
    process: 'Zpracovat',
    processing: 'Zpracovává se…',
    statusProcessing: 'Zpracování obrázku…',
    statusDetected: 'Rozpoznáno {count} karet.',
    original: 'Originál',
    detected: 'Rozpoznané karty ({count})',
    unidentified: 'Nerozpoznáno ({count}) — nezapočítává se',
    unrecognized: 'Nerozpoznáno',
    altScanned: 'Naskenovaná karta: {name}',
    altUnrecognized: 'Nerozpoznaná karta {index}',
    save: 'Uložit',
    saved: 'Uloženo'
  },
  saved: {
    heading: 'Uložené karty',
    empty: 'Zatím žádné uložené karty.',
    loading: 'Načítá se…',
    error: 'Uložené karty se nepodařilo načíst. Běží backend?',
    signInPrompt: 'Přihlaste se, abyste viděli svou sbírku.'
  }
}

export default cs
