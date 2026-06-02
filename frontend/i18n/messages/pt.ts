import type { Messages } from './en'

const pt: Messages = {
  app: {
    tagline:
      'Digitalize uma página de fichário para reconhecer as suas cartas Magic: The Gathering e consultar os seus preços.'
  },
  nav: {
    language: 'Idioma'
  },
  auth: {
    signIn: 'Iniciar sessão'
  },
  scan: {
    heading: 'Digitalizar uma página de fichário',
    help: 'Carregue uma foto de cartas dispostas em uma grade (até 4×4) e escolha o layout abaixo. Espaços vazios são ignorados.',
    fileLabel: 'Foto do fichário',
    gridLabel: 'Layout da grade',
    gridUsed: 'Layout: {rows}×{cols}',
    process: 'Processar',
    processing: 'A processar…',
    statusProcessing: 'A processar imagem…',
    statusDetected: 'Detetadas {count} cartas.',
    original: 'Original',
    detected: 'Cartas detetadas ({count})',
    unidentified: 'Não identificadas ({count}) — não contadas',
    unrecognized: 'Não reconhecida',
    altScanned: 'Carta digitalizada: {name}',
    altUnrecognized: 'Carta não reconhecida {index}',
    save: 'Guardar',
    saved: 'Guardado'
  },
  saved: {
    heading: 'Cartas guardadas',
    empty: 'Ainda não há cartas guardadas.',
    loading: 'A carregar…',
    error: 'Não foi possível carregar as cartas guardadas. O backend está em execução?',
    signInPrompt: 'Inicie sessão para ver a sua coleção.'
  }
}

export default pt
