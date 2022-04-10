import { expect } from "chai"
import Sinon from "sinon"
import PokedexModel from "../../../models"
import PokeApi from "../mocks"


describe('Copa Model', () => {
  let pokedexModel = new PokedexModel()

  describe('Testing getAll PokedexModel', () => {
    before(() => {
      Sinon.stub(pokedexModel.model, 'find').resolves(PokeApi)
    })

    after(() => {
      Sinon.restore()
    });

    it('Returns all Pokemons with your status and type', async () => {
      const result = await pokedexModel.read()

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(PokeApi.length)

      expect(result[0]).to.have.property('nome')
      expect(result[0]).to.have.property('hp')
      expect(result[0]).to.have.property('ataque')
      expect(result[0]).to.have.property('defesa')
      expect(result[0]).to.have.property('velocidade')
      expect(result[0]).to.have.property('total')
      expect(result[0]).to.have.property('habilidades')
      expect(result[0].habilidades).to.be.an('array')

      expect(result[0].habilidades).to.have.lengthOf(1)
      expect(result[0].habilidades[0]).to.have.property('habilidade1')
      expect(result[0].habilidades[0]).to.have.property('habilidade2')
      expect(result[0]).to.have.property('img')

      expect(result).to.deep.equal(PokeApi)
    })
  })
})
