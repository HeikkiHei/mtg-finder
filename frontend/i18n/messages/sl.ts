import type { Messages } from './en'

const sl: Messages = {
  app: {
    tagline:
      'Skenirajte stran albuma, da prepoznate svoje karte Magic: The Gathering in preverite njihove cene.'
  },
  nav: {
    language: 'Jezik'
  },
  auth: {
    signIn: 'Prijava'
  },
  scan: {
    heading: 'Skeniraj stran albuma',
    help: 'Naložite fotografijo kart, razporejenih v mrežo (do 4×4), in spodaj izberite postavitev. Prazna mesta se preskočijo.',
    fileLabel: 'Fotografija albuma',
    gridLabel: 'Postavitev mreže',
    gridUsed: 'Postavitev: {rows}×{cols}',
    process: 'Obdelaj',
    processing: 'Obdelava…',
    statusProcessing: 'Obdelava slike…',
    statusDetected: 'Zaznanih {count} kart.',
    original: 'Izvirnik',
    detected: 'Zaznane karte ({count})',
    unidentified: 'Neprepoznano ({count}) — ni šteto',
    unrecognized: 'Neprepoznano',
    altScanned: 'Skenirana karta: {name}',
    altUnrecognized: 'Neprepoznana karta {index}',
    save: 'Shrani',
    saved: 'Shranjeno'
  },
  saved: {
    heading: 'Shranjene karte',
    empty: 'Še ni shranjenih kart.',
    loading: 'Nalaganje…',
    error: 'Shranjenih kart ni bilo mogoče naložiti. Ali backend teče?',
    signInPrompt: 'Prijavite se za ogled svoje zbirke.'
  }
}

export default sl
