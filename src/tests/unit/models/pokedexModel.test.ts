import { expect } from "chai"
import Sinon from "sinon"

import { PokedexModel } from "../../../models"
import pokeApi, { Pokemon } from "../mocks"
import { pokemonInput, pokemonPartialUpdateInput, pokemonUpdateInput } from "../inputs/pokemonInputs"

describe('Unit Test - Pokedex Model', () => {
  const pokedexModel = new PokedexModel()

  describe('1) - Testing getAll PokedexModel', () => {
    before(() => {
      Sinon.stub(pokedexModel.model, 'find').resolves(pokeApi)
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Assert your return is an Array, and length is the same as mock', async () => {
      const result = await pokedexModel.read()

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(pokeApi.length)
      expect(result).to.deep.equal(pokeApi)
    })

    it('2) - Check object properties', async () => {
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
  describe('2) - Testing Create of PokedexModel', () => {
    before(() => {
      Sinon.stub(pokedexModel.model, 'create').callsFake(Pokemon.create)
    })

    after(() => {
      Sinon.restore();
      pokeApi.pop()
    });

    describe('1) - Before being tested', () => {
      it('1) - Should return 2 records', async () => {
        expect(pokeApi.length).to.be.equal(2)
      })
    })

    describe('2) - After being tested', () => {
      it('1) - Should return 3 records', async () => {
        const result = await pokedexModel.create(pokemonInput)

        expect(pokeApi.length).to.be.equal(3)
        expect(result).to.be.an('object')
        expect(result).to.deep.equal(pokeApi[2])
      })
    })
  })

  describe('3.1) - Testing Update of PokedexModel', () => {
    before(() => {
      Sinon.stub(pokedexModel.model, 'findOneAndUpdate').resolves(pokemonUpdateInput)
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Should return the update profile', async () => {
      const result = await pokedexModel.update(pokemonInput._id, pokemonUpdateInput)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(pokemonUpdateInput)
    })
  });

  describe('3.2) - Testing partialUpdate of PokedexModel', () => {
    before(() => {
      Sinon.stub(pokedexModel.model, 'findOneAndUpdate').resolves(pokemonUpdateInput)
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Should return the update profile', async () => {
      const result = await pokedexModel.partialUpdate(pokemonInput._id, pokemonPartialUpdateInput)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(pokemonUpdateInput)
    })
  });

  describe('4) - Testing Delete of PokedexModel', () => {
    before(() => {
      Sinon.stub(pokedexModel.model, 'findOneAndDelete').resolves(pokemonInput)
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Should return the delete profile', async () => {
      const result = await pokedexModel.delete(pokemonInput._id)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(pokemonUpdateInput)
    })
  });
})
