export interface IPokedex {
  _id?: number,
  name: string,
  type: [string, string?],
  weight: {
    value: number,
    measurement: string,
  },
  height: {
    value: number,
    measurement: string,
  },
  description: string,
  baseStats: {
    hp: number,
    atk: number,
    def: number,
    satk: number,
    sdef: number,
    spd: number
  },    
  moves: {
    skill1: string,
    skill2: string,
  }
  image1: string,
  image2: string,
}

export default IPokedex;
