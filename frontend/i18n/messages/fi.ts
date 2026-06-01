import type { Messages } from './en'

const fi: Messages = {
  app: {
    tagline:
      'Skannaa kansiosivu tunnistaaksesi Magic: The Gathering -korttisi ja tarkistaaksesi niiden hinnat.'
  },
  nav: {
    language: 'Kieli'
  },
  scan: {
    heading: 'Skannaa kansiosivu',
    help: 'Lataa kuva 9 kortin kansiosivusta jakaaksesi sen yksittäisiin kortteihin.',
    fileLabel: 'Kansiokuva',
    process: 'Käsittele',
    processing: 'Käsitellään…',
    statusProcessing: 'Käsitellään kuvaa…',
    statusDetected: 'Tunnistettiin {count} korttia.',
    original: 'Alkuperäinen',
    detected: 'Tunnistetut kortit ({count})',
    unrecognized: 'Tunnistamaton',
    altScanned: 'Skannattu kortti: {name}',
    altUnrecognized: 'Tunnistamaton kortti {index}'
  },
  saved: {
    heading: 'Tallennetut kortit',
    empty: 'Ei vielä tallennettuja kortteja.',
    loading: 'Ladataan…',
    error: 'Tallennettujen korttien lataaminen epäonnistui. Onko backend käynnissä?'
  }
}

export default fi
