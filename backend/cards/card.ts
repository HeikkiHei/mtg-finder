import { ObjectId } from 'mongodb'
import { ForeignData } from './foreign'
import { Identifiers } from './identifiers'
import { LeadershipSkills } from './leadership'
import { Legalities } from './legalities'
import { PurchaseUrls } from './purchases'

export default class Card {
  constructor(
    public id?: ObjectId,
    public name?: string,
    public type?: string,
    public rarity?: string,
    public asciiName?: string,
    public attractionLights?: number[],
    public colorIdentity?: string[],
    public colorIndicator?: string[],
    public colors?: string[],
    public convertedManaCost?: number,
    public defense?: string,
    public edhrecRank?: number,
    public edhrecSaltiness?: number,
    public faceConvertedManaCost?: number,
    public faceManaValue?: number,
    public faceName?: string,
    public firstPrinting?: string,
    public foreignData?: ForeignData[],
    public hand?: string,
    public hasAlternativeDeckLimit?: boolean,
    public identifiers?: Identifiers,
    public isFunny?: boolean,
    public isReserved?: boolean,
    public keywords?: string[],
    public layout?: string,
    public leadershipSkills?: LeadershipSkills,
    public legalities?: Legalities,
    public life?: string,
    public loyalty?: string,
    public manaCost?: string,
    public manaValue?: number,
    public power?: string,
    public printings?: string[],
    public purchaseUrls?: PurchaseUrls,
    public relatedCards?: RelatedCards,
    public rulings?: Rulings[],
    public side?: string,
    public subsets?: string[],
    public subtypes?: string[],
    public supertypes?: string[],
    public text?: string,
    public toughness?: string,
    public types?: string[]
  ) {
    this.id = id
    this.name = name
    this.type = type
    this.rarity = rarity
  }
}

export type RelatedCards = {
  reverseRelated?: string[]
  spellbook?: string[]
}
export type Rulings = {
  date: string
  text: string
}
