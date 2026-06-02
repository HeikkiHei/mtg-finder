import type { Messages } from './en'

const es: Messages = {
  app: {
    tagline:
      'Escanea una página de archivador para reconocer tus cartas de Magic: The Gathering y consultar sus precios.'
  },
  nav: {
    language: 'Idioma'
  },
  auth: {
    signIn: 'Iniciar sesión'
  },
  scan: {
    heading: 'Escanear una página de archivador',
    help: 'Sube una foto de una página de archivador de 9 cartas para dividirla en cartas.',
    fileLabel: 'Foto del archivador',
    process: 'Procesar',
    processing: 'Procesando…',
    statusProcessing: 'Procesando imagen…',
    statusDetected: 'Se detectaron {count} cartas.',
    original: 'Original',
    detected: 'Cartas detectadas ({count})',
    unrecognized: 'No reconocida',
    altScanned: 'Carta escaneada: {name}',
    altUnrecognized: 'Carta no reconocida {index}',
    save: 'Guardar',
    saved: 'Guardado'
  },
  saved: {
    heading: 'Cartas guardadas',
    empty: 'Aún no hay cartas guardadas.',
    loading: 'Cargando…',
    error: 'No se pudieron cargar las cartas guardadas. ¿Está el backend en marcha?',
    signInPrompt: 'Inicia sesión para ver tu colección.'
  }
}

export default es
