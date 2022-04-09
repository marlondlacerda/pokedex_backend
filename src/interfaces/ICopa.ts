export interface ICopaBase extends ICopa {
  _id: string
}

export interface ICopa {
  year: number
  hostCountry: string
  champions: string
  runnerUp: string
  editionGoals: number
  editionStrikers: string[]
  bestPlayer: string
  bestGoalkeeper: string
  bestYoungPlayer: string
}
