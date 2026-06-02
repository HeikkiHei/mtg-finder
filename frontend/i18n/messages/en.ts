const en = {
  app: {
    tagline:
      'Scan a binder page to recognize your Magic: The Gathering cards and look up their prices.'
  },
  nav: {
    language: 'Language'
  },
  auth: {
    signIn: 'Sign in'
  },
  scan: {
    heading: 'Scan a binder page',
    help: 'Upload a photo of cards laid out in a grid (up to 4×4) and choose the layout below. Empty slots are skipped.',
    fileLabel: 'Binder photo',
    gridLabel: 'Grid layout',
    gridUsed: 'Layout: {rows}×{cols}',
    process: 'Process',
    processing: 'Processing…',
    statusProcessing: 'Processing image…',
    statusDetected: 'Identified {count} cards.',
    original: 'Original',
    detected: 'Identified cards ({count})',
    unidentified: 'Couldn’t identify ({count}) — not counted',
    unrecognized: 'Unrecognized',
    altScanned: 'Scanned card: {name}',
    altUnrecognized: 'Unrecognized card {index}',
    save: 'Save',
    saved: 'Saved'
  },
  saved: {
    heading: 'Saved cards',
    empty: 'No saved cards yet.',
    loading: 'Loading…',
    error: 'Couldn’t load saved cards. Is the backend running?',
    signInPrompt: 'Sign in to see your collection.'
  }
}

export type Messages = typeof en

export default en
