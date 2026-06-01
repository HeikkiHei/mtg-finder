import type { Locale } from '../routing'
import bg from './bg'
import cs from './cs'
import da from './da'
import de from './de'
import el from './el'
import en, { type Messages } from './en'
import es from './es'
import et from './et'
import fi from './fi'
import fr from './fr'
import ga from './ga'
import hr from './hr'
import hu from './hu'
import it from './it'
import ja from './ja'
import lt from './lt'
import lv from './lv'
import mt from './mt'
import nl from './nl'
import pl from './pl'
import pt from './pt'
import ro from './ro'
import sk from './sk'
import sl from './sl'
import sv from './sv'
import zh from './zh'

export type { Messages }

export const messages: Record<Locale, Messages> = {
  en,
  bg,
  cs,
  da,
  de,
  el,
  es,
  et,
  fi,
  fr,
  ga,
  hr,
  hu,
  it,
  lt,
  lv,
  mt,
  nl,
  pl,
  pt,
  ro,
  sk,
  sl,
  sv,
  zh,
  ja
}
