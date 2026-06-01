import type { Messages } from './en'

const el: Messages = {
  app: {
    tagline:
      'Σαρώστε μια σελίδα άλμπουμ για να αναγνωρίσετε τις κάρτες σας Magic: The Gathering και να δείτε τις τιμές τους.'
  },
  nav: {
    language: 'Γλώσσα'
  },
  scan: {
    heading: 'Σάρωση σελίδας άλμπουμ',
    help: 'Ανεβάστε μια φωτογραφία μιας σελίδας με 9 κάρτες για να τη χωρίσετε σε κάρτες.',
    fileLabel: 'Φωτογραφία άλμπουμ',
    process: 'Επεξεργασία',
    processing: 'Επεξεργασία…',
    statusProcessing: 'Επεξεργασία εικόνας…',
    statusDetected: 'Εντοπίστηκαν {count} κάρτες.',
    original: 'Πρωτότυπο',
    detected: 'Κάρτες που εντοπίστηκαν ({count})',
    unrecognized: 'Μη αναγνωρισμένη',
    altScanned: 'Σαρωμένη κάρτα: {name}',
    altUnrecognized: 'Μη αναγνωρισμένη κάρτα {index}'
  },
  saved: {
    heading: 'Αποθηκευμένες κάρτες',
    empty: 'Δεν υπάρχουν αποθηκευμένες κάρτες ακόμη.',
    loading: 'Φόρτωση…',
    error: 'Δεν ήταν δυνατή η φόρτωση των αποθηκευμένων καρτών. Εκτελείται το backend;'
  }
}

export default el
