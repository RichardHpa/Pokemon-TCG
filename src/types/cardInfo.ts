export interface Legalities {
  unlimited?: 'Legal'
  standard?: 'Legal'
  expanded?: 'Legal'
}

export interface Attack {
  name: string
  cost: string[]
  convertedEnergyCost: number
  damage: string
  text: string
}

export interface Prices {
  low?: number
  mid?: number
  high?: number
  market?: number
  directLow?: number
}

export interface Effects {
  type: string
  value: string
}

export interface Abilities {
  name: string
  text: string
  type: string
}
