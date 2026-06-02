import type { Messages } from './en'

const ga: Messages = {
  app: {
    tagline:
      'Scan leathanach ceanglóra chun do chártaí Magic: The Gathering a aithint agus a bpraghsanna a sheiceáil.'
  },
  nav: {
    language: 'Teanga'
  },
  auth: {
    signIn: 'Logáil isteach'
  },
  scan: {
    heading: 'Scan leathanach ceanglóra',
    help: 'Uaslódáil grianghraf de chártaí leagtha amach i ngreille (suas le 4×4) agus roghnaigh an leagan amach thíos. Ní háirítear sliotáin fholmha.',
    fileLabel: 'Grianghraf ceanglóra',
    gridLabel: 'Leagan amach na greille',
    gridUsed: 'Leagan amach: {rows}×{cols}',
    process: 'Próiseáil',
    processing: 'Á phróiseáil…',
    statusProcessing: 'Íomhá á próiseáil…',
    statusDetected: 'Aimsíodh {count} cárta.',
    original: 'Bunleagan',
    detected: 'Cártaí aimsithe ({count})',
    unidentified: 'Gan aithint ({count}) — gan áireamh',
    unrecognized: 'Gan aithint',
    altScanned: 'Cárta scanta: {name}',
    altUnrecognized: 'Cárta gan aithint {index}',
    save: 'Sábháil',
    saved: 'Sábháilte'
  },
  saved: {
    heading: 'Cártaí sábháilte',
    empty: 'Níl aon chárta sábháilte fós.',
    loading: 'Á luchtú…',
    error: 'Níorbh fhéidir na cártaí sábháilte a luchtú. An bhfuil an backend ar siúl?',
    signInPrompt: 'Logáil isteach chun do bhailiúchán a fheiceáil.'
  }
}

export default ga
