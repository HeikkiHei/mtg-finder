import type { Messages } from './en'

const sk: Messages = {
  app: {
    tagline:
      'Naskenujte stranu albumu, aby ste rozpoznali svoje karty Magic: The Gathering a zistili ich ceny.'
  },
  nav: {
    language: 'Jazyk'
  },
  scan: {
    heading: 'Naskenovať stranu albumu',
    help: 'Nahrajte fotku strany albumu s 9 kartami, aby ste ju rozdelili na karty.',
    fileLabel: 'Fotka albumu',
    process: 'Spracovať',
    processing: 'Spracúva sa…',
    statusProcessing: 'Spracúva sa obrázok…',
    statusDetected: 'Rozpoznaných {count} kariet.',
    original: 'Originál',
    detected: 'Rozpoznané karty ({count})',
    unrecognized: 'Nerozpoznané',
    altScanned: 'Naskenovaná karta: {name}',
    altUnrecognized: 'Nerozpoznaná karta {index}'
  },
  saved: {
    heading: 'Uložené karty',
    empty: 'Zatiaľ žiadne uložené karty.',
    loading: 'Načítava sa…',
    error: 'Uložené karty sa nepodarilo načítať. Beží backend?'
  }
}

export default sk
