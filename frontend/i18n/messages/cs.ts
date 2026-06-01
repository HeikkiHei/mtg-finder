import type { Messages } from './en'

const cs: Messages = {
  app: {
    tagline:
      'Naskenujte stránku z alba a rozpoznejte své karty Magic: The Gathering a zjistěte jejich ceny.'
  },
  nav: {
    language: 'Jazyk'
  },
  scan: {
    heading: 'Naskenovat stránku z alba',
    help: 'Nahrajte fotku stránky s 9 kartami a rozdělte ji na jednotlivé karty.',
    fileLabel: 'Fotka alba',
    process: 'Zpracovat',
    processing: 'Zpracovává se…',
    statusProcessing: 'Zpracování obrázku…',
    statusDetected: 'Rozpoznáno {count} karet.',
    original: 'Originál',
    detected: 'Rozpoznané karty ({count})',
    unrecognized: 'Nerozpoznáno',
    altScanned: 'Naskenovaná karta: {name}',
    altUnrecognized: 'Nerozpoznaná karta {index}'
  },
  saved: {
    heading: 'Uložené karty',
    empty: 'Zatím žádné uložené karty.',
    loading: 'Načítá se…',
    error: 'Uložené karty se nepodařilo načíst. Běží backend?'
  }
}

export default cs
