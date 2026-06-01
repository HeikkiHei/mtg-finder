import type { Messages } from './en'

const pl: Messages = {
  app: {
    tagline:
      'Zeskanuj stronę segregatora, aby rozpoznać swoje karty Magic: The Gathering i sprawdzić ich ceny.'
  },
  nav: {
    language: 'Język'
  },
  scan: {
    heading: 'Zeskanuj stronę segregatora',
    help: 'Prześlij zdjęcie strony segregatora z 9 kartami, aby podzielić ją na karty.',
    fileLabel: 'Zdjęcie segregatora',
    process: 'Przetwórz',
    processing: 'Przetwarzanie…',
    statusProcessing: 'Przetwarzanie obrazu…',
    statusDetected: 'Wykryto {count} kart.',
    original: 'Oryginał',
    detected: 'Wykryte karty ({count})',
    unrecognized: 'Nierozpoznana',
    altScanned: 'Zeskanowana karta: {name}',
    altUnrecognized: 'Nierozpoznana karta {index}'
  },
  saved: {
    heading: 'Zapisane karty',
    empty: 'Brak zapisanych kart.',
    loading: 'Ładowanie…',
    error: 'Nie udało się załadować zapisanych kart. Czy backend działa?'
  }
}

export default pl
