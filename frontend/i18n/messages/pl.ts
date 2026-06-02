import type { Messages } from './en'

const pl: Messages = {
  app: {
    tagline:
      'Zeskanuj stronę segregatora, aby rozpoznać swoje karty Magic: The Gathering i sprawdzić ich ceny.'
  },
  nav: {
    language: 'Język'
  },
  auth: {
    signIn: 'Zaloguj się'
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
    altUnrecognized: 'Nierozpoznana karta {index}',
    save: 'Zapisz',
    saved: 'Zapisano'
  },
  saved: {
    heading: 'Zapisane karty',
    empty: 'Brak zapisanych kart.',
    loading: 'Ładowanie…',
    error: 'Nie udało się załadować zapisanych kart. Czy backend działa?',
    signInPrompt: 'Zaloguj się, aby zobaczyć swoją kolekcję.'
  }
}

export default pl
