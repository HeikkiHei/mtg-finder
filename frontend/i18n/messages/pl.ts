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
    help: 'Prześlij zdjęcie kart ułożonych w siatkę (do 4×4) i wybierz układ poniżej. Puste miejsca są pomijane.',
    fileLabel: 'Zdjęcie segregatora',
    gridLabel: 'Układ siatki',
    gridUsed: 'Układ: {rows}×{cols}',
    process: 'Przetwórz',
    processing: 'Przetwarzanie…',
    statusProcessing: 'Przetwarzanie obrazu…',
    statusDetected: 'Wykryto {count} kart.',
    original: 'Oryginał',
    detected: 'Wykryte karty ({count})',
    unidentified: 'Nierozpoznane ({count}) — nieliczone',
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
