import type { Messages } from './en'

const sl: Messages = {
  app: {
    tagline:
      'Skenirajte stran albuma, da prepoznate svoje karte Magic: The Gathering in preverite njihove cene.'
  },
  nav: {
    language: 'Jezik'
  },
  scan: {
    heading: 'Skeniraj stran albuma',
    help: 'Naložite fotografijo strani albuma z 9 kartami, da jo razdelite na karte.',
    fileLabel: 'Fotografija albuma',
    process: 'Obdelaj',
    processing: 'Obdelava…',
    statusProcessing: 'Obdelava slike…',
    statusDetected: 'Zaznanih {count} kart.',
    original: 'Izvirnik',
    detected: 'Zaznane karte ({count})',
    unrecognized: 'Neprepoznano',
    altScanned: 'Skenirana karta: {name}',
    altUnrecognized: 'Neprepoznana karta {index}'
  },
  saved: {
    heading: 'Shranjene karte',
    empty: 'Še ni shranjenih kart.',
    loading: 'Nalaganje…',
    error: 'Shranjenih kart ni bilo mogoče naložiti. Ali backend teče?'
  }
}

export default sl
