import type { Messages } from './en'

const lv: Messages = {
  app: {
    tagline:
      'Skenējiet mapes lapu, lai atpazītu savas Magic: The Gathering kārtis un uzzinātu to cenas.'
  },
  nav: {
    language: 'Valoda'
  },
  auth: {
    signIn: 'Pieslēgties'
  },
  scan: {
    heading: 'Skenēt mapes lapu',
    help: 'Augšupielādējiet fotoattēlu ar kārtīm, kas izkārtotas režģī (līdz 4×4), un izvēlieties izkārtojumu zemāk. Tukšās vietas tiek izlaistas.',
    fileLabel: 'Mapes fotoattēls',
    gridLabel: 'Režģa izkārtojums',
    gridUsed: 'Izkārtojums: {rows}×{cols}',
    process: 'Apstrādāt',
    processing: 'Apstrādā…',
    statusProcessing: 'Apstrādā attēlu…',
    statusDetected: 'Atrastas {count} kārtis.',
    original: 'Oriģināls',
    detected: 'Atrastās kārtis ({count})',
    unidentified: 'Neatpazīti ({count}) — netiek skaitīti',
    unrecognized: 'Neatpazīta',
    altScanned: 'Skenēta kārts: {name}',
    altUnrecognized: 'Neatpazīta kārts {index}',
    save: 'Saglabāt',
    saved: 'Saglabāts'
  },
  saved: {
    heading: 'Saglabātās kārtis',
    empty: 'Vēl nav saglabātu kāršu.',
    loading: 'Ielādē…',
    error: 'Neizdevās ielādēt saglabātās kārtis. Vai backend darbojas?',
    signInPrompt: 'Piesakieties, lai redzētu savu kolekciju.'
  }
}

export default lv
