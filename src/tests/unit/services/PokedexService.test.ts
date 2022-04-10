import { expect } from "chai"
import Sinon from "sinon"
import PokedexModel from "../../../models"
import PokedexService from "../../../services"
import pokeApi from "../mocks"

describe('Pokedex Service', () => {
  let pokedexService = new PokedexService()

  describe('Testing getAll Pokedex Service', () => {
    before(() => {
      Sinon.stub(pokedexService.model, 'read').resolves(pokeApi)
    })

    after(() => {
      Sinon.restore();
    });

    it('Returns all Worlds of Cup since from 1986 until 2018', async () => {
      const result = await pokedexService.read();

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(pokeApi.length)

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

      expect(result).to.deep.equal(pokeApi)
    })
  })
})
