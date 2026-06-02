import type { Messages } from './en'

const ro: Messages = {
  app: {
    tagline:
      'Scanează o pagină de clasor pentru a-ți recunoaște cărțile Magic: The Gathering și a le verifica prețurile.'
  },
  nav: {
    language: 'Limbă'
  },
  auth: {
    signIn: 'Autentificare'
  },
  scan: {
    heading: 'Scanează o pagină de clasor',
    help: 'Încarcă o fotografie cu cărți aranjate într-o grilă (până la 4×4) și alege aspectul mai jos. Spațiile goale sunt omise.',
    fileLabel: 'Fotografie clasor',
    gridLabel: 'Aspectul grilei',
    gridUsed: 'Aspect: {rows}×{cols}',
    process: 'Procesează',
    processing: 'Se procesează…',
    statusProcessing: 'Se procesează imaginea…',
    statusDetected: 'S-au detectat {count} cărți.',
    original: 'Original',
    detected: 'Cărți detectate ({count})',
    unidentified: 'Neidentificate ({count}) — necontorizate',
    unrecognized: 'Nerecunoscută',
    altScanned: 'Carte scanată: {name}',
    altUnrecognized: 'Carte nerecunoscută {index}',
    save: 'Salvează',
    saved: 'Salvat'
  },
  saved: {
    heading: 'Cărți salvate',
    empty: 'Încă nu există cărți salvate.',
    loading: 'Se încarcă…',
    error: 'Cărțile salvate nu au putut fi încărcate. Rulează backendul?',
    signInPrompt: 'Autentifică-te pentru a-ți vedea colecția.'
  }
}

export default ro
