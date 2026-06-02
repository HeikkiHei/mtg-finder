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
    help: 'Upload a photo of a 9-card binder page to split it into cards.',
    fileLabel: 'Binder photo',
    process: 'Process',
    processing: 'Processing…',
    statusProcessing: 'Processing image…',
    statusDetected: 'Detected {count} cards.',
    original: 'Original',
    detected: 'Detected cards ({count})',
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
