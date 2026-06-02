import type { Messages } from './en'

const sk: Messages = {
  app: {
    tagline:
      'Naskenujte stranu albumu, aby ste rozpoznali svoje karty Magic: The Gathering a zistili ich ceny.'
  },
  nav: {
    language: 'Jazyk'
  },
  auth: {
    signIn: 'Prihlásiť sa'
  },
  scan: {
    heading: 'Naskenovať stranu albumu',
    help: 'Nahrajte fotku kariet usporiadaných do mriežky (až 4×4) a nižšie zvoľte rozloženie. Prázdne miesta sa preskočia.',
    fileLabel: 'Fotka albumu',
    gridLabel: 'Rozloženie mriežky',
    gridUsed: 'Rozloženie: {rows}×{cols}',
    process: 'Spracovať',
    processing: 'Spracúva sa…',
    statusProcessing: 'Spracúva sa obrázok…',
    statusDetected: 'Rozpoznaných {count} kariet.',
    original: 'Originál',
    detected: 'Rozpoznané karty ({count})',
    unidentified: 'Nerozpoznané ({count}) — nezapočítané',
    unrecognized: 'Nerozpoznané',
    altScanned: 'Naskenovaná karta: {name}',
    altUnrecognized: 'Nerozpoznaná karta {index}',
    save: 'Uložiť',
    saved: 'Uložené'
  },
  saved: {
    heading: 'Uložené karty',
    empty: 'Zatiaľ žiadne uložené karty.',
    loading: 'Načítava sa…',
    error: 'Uložené karty sa nepodarilo načítať. Beží backend?',
    signInPrompt: 'Prihláste sa, aby ste videli svoju zbierku.'
  }
}

export default sk
