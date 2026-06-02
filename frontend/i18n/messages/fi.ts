import type { Messages } from './en'

const fi: Messages = {
  app: {
    tagline:
      'Skannaa kansiosivu tunnistaaksesi Magic: The Gathering -korttisi ja tarkistaaksesi niiden hinnat.'
  },
  nav: {
    language: 'Kieli'
  },
  auth: {
    signIn: 'Kirjaudu'
  },
  scan: {
    heading: 'Skannaa kansiosivu',
    help: 'Lataa kuva ruudukkoon aseteltuista korteista (enintään 4×4) ja valitse asettelu alta. Tyhjät paikat ohitetaan.',
    fileLabel: 'Kansiokuva',
    gridLabel: 'Ruudukon asettelu',
    gridUsed: 'Asettelu: {rows}×{cols}',
    process: 'Käsittele',
    processing: 'Käsitellään…',
    statusProcessing: 'Käsitellään kuvaa…',
    statusDetected: 'Tunnistettiin {count} korttia.',
    original: 'Alkuperäinen',
    detected: 'Tunnistetut kortit ({count})',
    unidentified: 'Ei tunnistettu ({count}) — ei lasketa',
    unrecognized: 'Tunnistamaton',
    altScanned: 'Skannattu kortti: {name}',
    altUnrecognized: 'Tunnistamaton kortti {index}',
    save: 'Tallenna',
    saved: 'Tallennettu'
  },
  saved: {
    heading: 'Tallennetut kortit',
    empty: 'Ei vielä tallennettuja kortteja.',
    loading: 'Ladataan…',
    error: 'Tallennettujen korttien lataaminen epäonnistui. Onko backend käynnissä?',
    signInPrompt: 'Kirjaudu sisään nähdäksesi kokoelmasi.'
  }
}

export default fi
