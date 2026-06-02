import type { Messages } from './en'

const bg: Messages = {
  app: {
    tagline:
      'Сканирайте страница от класьор, за да разпознаете вашите карти Magic: The Gathering и да проверите цените им.'
  },
  nav: {
    language: 'Език'
  },
  auth: {
    signIn: 'Вход'
  },
  scan: {
    heading: 'Сканиране на страница от класьор',
    help: 'Качете снимка на карти, подредени в мрежа (до 4×4), и изберете подредбата по-долу. Празните места се пропускат.',
    fileLabel: 'Снимка на класьора',
    gridLabel: 'Подредба на мрежата',
    gridUsed: 'Подредба: {rows}×{cols}',
    process: 'Обработка',
    processing: 'Обработва се…',
    statusProcessing: 'Обработка на изображението…',
    statusDetected: 'Открити са {count} карти.',
    original: 'Оригинал',
    detected: 'Открити карти ({count})',
    unrecognized: 'Неразпозната',
    altScanned: 'Сканирана карта: {name}',
    altUnrecognized: 'Неразпозната карта {index}',
    save: 'Запази',
    saved: 'Запазено'
  },
  saved: {
    heading: 'Запазени карти',
    empty: 'Все още няма запазени карти.',
    loading: 'Зарежда се…',
    error: 'Запазените карти не можаха да се заредят. Работи ли бекендът?',
    signInPrompt: 'Влезте, за да видите колекцията си.'
  }
}

export default bg
