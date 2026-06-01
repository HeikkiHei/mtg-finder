import type { Messages } from './en'

const bg: Messages = {
  app: {
    tagline:
      'Сканирайте страница от класьор, за да разпознаете вашите карти Magic: The Gathering и да проверите цените им.'
  },
  nav: {
    language: 'Език'
  },
  scan: {
    heading: 'Сканиране на страница от класьор',
    help: 'Качете снимка на страница с 9 карти, за да я разделите на отделни карти.',
    fileLabel: 'Снимка на класьора',
    process: 'Обработка',
    processing: 'Обработва се…',
    statusProcessing: 'Обработка на изображението…',
    statusDetected: 'Открити са {count} карти.',
    original: 'Оригинал',
    detected: 'Открити карти ({count})',
    unrecognized: 'Неразпозната',
    altScanned: 'Сканирана карта: {name}',
    altUnrecognized: 'Неразпозната карта {index}'
  },
  saved: {
    heading: 'Запазени карти',
    empty: 'Все още няма запазени карти.',
    loading: 'Зарежда се…',
    error: 'Запазените карти не можаха да се заредят. Работи ли бекендът?'
  }
}

export default bg
