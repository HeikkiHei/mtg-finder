import type { Messages } from './en'

const el: Messages = {
  app: {
    tagline:
      'Σαρώστε μια σελίδα άλμπουμ για να αναγνωρίσετε τις κάρτες σας Magic: The Gathering και να δείτε τις τιμές τους.'
  },
  nav: {
    language: 'Γλώσσα'
  },
  auth: {
    signIn: 'Σύνδεση'
  },
  scan: {
    heading: 'Σάρωση σελίδας άλμπουμ',
    help: 'Ανεβάστε μια φωτογραφία καρτών σε πλέγμα (έως 4×4) και επιλέξτε τη διάταξη παρακάτω. Οι κενές θέσεις παραλείπονται.',
    fileLabel: 'Φωτογραφία άλμπουμ',
    gridLabel: 'Διάταξη πλέγματος',
    gridUsed: 'Διάταξη: {rows}×{cols}',
    process: 'Επεξεργασία',
    processing: 'Επεξεργασία…',
    statusProcessing: 'Επεξεργασία εικόνας…',
    statusDetected: 'Αναγνωρίστηκαν {count} κάρτες.',
    original: 'Πρωτότυπο',
    detected: 'Αναγνωρισμένες κάρτες ({count})',
    unidentified: 'Δεν αναγνωρίστηκαν ({count}) — δεν μετρώνται',
    unrecognized: 'Μη αναγνωρισμένη',
    altScanned: 'Σαρωμένη κάρτα: {name}',
    altUnrecognized: 'Μη αναγνωρισμένη κάρτα {index}',
    save: 'Αποθήκευση',
    saved: 'Αποθηκεύτηκε'
  },
  saved: {
    heading: 'Αποθηκευμένες κάρτες',
    empty: 'Δεν υπάρχουν αποθηκευμένες κάρτες ακόμη.',
    loading: 'Φόρτωση…',
    error: 'Δεν ήταν δυνατή η φόρτωση των αποθηκευμένων καρτών. Εκτελείται το backend;',
    signInPrompt: 'Συνδεθείτε για να δείτε τη συλλογή σας.'
  }
}

export default el
