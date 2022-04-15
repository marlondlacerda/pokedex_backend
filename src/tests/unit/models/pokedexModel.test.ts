import { expect } from "chai"
import Sinon from "sinon"

import PokeApi from "../mocks"
import { PokedexModel } from "../../../models"
import pokeApi from "../mocks"

describe('Pokedex Model', () => {
  let pokedexModel = new PokedexModel()

  describe('Testing getAll PokedexModel', () => {
    before(() => {
      Sinon.stub(pokedexModel.model, 'find').resolves(pokeApi)
    })

    after(() => {
      Sinon.restore();
    });

    it('Assert your return is an Array, and length is the same as mock', async () => {
      const result = await pokedexModel.read()

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(PokeApi.length)
      expect(result).to.deep.equal(PokeApi)
    })

    it('Check object properties', async () => {
      const result = await pokedexModel.read()

      expect(result[0]).to.have.property('_id')
      expect(result[0]).to.have.property('name')
      expect(result[0]).to.have.property('type')

      expect(result[0]).to.have.property('height')
      expect(result[0].height).to.have.property('value')
      expect(result[0].height).to.have.property('measurement')

      expect(result[0]).to.have.property('weight')
      expect(result[0].weight).to.have.property('value')
      expect(result[0].weight).to.have.property('measurement')

      expect(result[0]).to.have.property('baseStats')
      expect(result[0].baseStats).to.have.property('hp')
      expect(result[0].baseStats).to.have.property('atk')
      expect(result[0].baseStats).to.have.property('def')
      expect(result[0].baseStats).to.have.property('satk')
      expect(result[0].baseStats).to.have.property('sdef')
      expect(result[0].baseStats).to.have.property('spd')

      expect(result[0]).to.have.property('moves')
      expect(result[0].moves).to.have.property('skill1')
      expect(result[0].moves).to.have.property('skill2')

      expect(result[0]).to.have.property('image1')
      expect(result[0]).to.have.property('image2')
    })
  })
})
