import { expect } from "chai"
import Sinon from "sinon"

import { PokedexModel } from "../../../models"
import pokeApi, { Pokemon } from "../mocks"
import { pokemonInput, pokemonPartialUpdateInput, pokemonUpdateInput } from "../inputs/pokemonInputs"

describe('Unit Test - Pokedex Model', () => {
  const pokedexModel = new PokedexModel()

  describe('1) - Testing Create of PokedexModel', () => {
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

  describe('2.1) - Testing getAll PokedexModel', () => {
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

  describe('2.2 - Test getById PokedexModel', () => {
    before(() => {
      Sinon.stub(pokedexModel.model, 'findById').resolves(pokeApi[0])
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Assert your return is an Object', async () => {
      const result = await pokedexModel.readOne(1)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(pokeApi[0])
    })

    it('2) - Check object properties', async () => {
      const result = await pokedexModel.readOne(1)

      expect(result).to.have.property('_id')
      expect(result).to.have.property('name')
      expect(result).to.have.property('type')

      expect(result).to.have.property('height')
      expect(result.height).to.have.property('value')
      expect(result.height).to.have.property('measurement')

      expect(result).to.have.property('weight')
      expect(result.weight).to.have.property('value')
      expect(result.weight).to.have.property('measurement')

      expect(result).to.have.property('baseStats')
      expect(result.baseStats).to.have.property('hp')
      expect(result.baseStats).to.have.property('atk')
      expect(result.baseStats).to.have.property('def')
      expect(result.baseStats).to.have.property('satk')
      expect(result.baseStats).to.have.property('sdef')
      expect(result.baseStats).to.have.property('spd')

      expect(result).to.have.property('moves')
      expect(result.moves).to.have.property('skill1')
      expect(result.moves).to.have.property('skill2')

      expect(result).to.have.property('image1')
      expect(result).to.have.property('image2')
    })
  });

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
      expect(result).to.deep.equal(pokemonInput)
    })
  });
})
