import { expect } from "chai";
import Sinon from "sinon";

import { PokedexService } from "../../../services";
import pokeApi, { Pokemon } from "../mocks";
import { pokemonInput, pokemonPartialUpdateInput, pokemonUpdateInput } from "../inputs";
import { PokedexModel } from "../../../models";

describe('Unit Test - Pokedex Service', () => {
  const pokedexModel = new PokedexModel();
  const pokedexService = new PokedexService(pokedexModel)

  describe('1) - Testing Create of Pokedex Service', () => {
    before(() => {
      Sinon.stub(pokedexService.model, 'create').callsFake(Pokemon.create)
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
        const result = await pokedexService.create(pokemonInput)

        expect(pokeApi.length).to.be.equal(3)
        expect(result).to.be.an('object')
        expect(result).to.deep.equal(pokeApi[2])
      })
    })
  })

  describe('2.1) - Testing getAll Pokedex Service', () => {
    before(() => {
      Sinon.stub(pokedexService.model, 'read').resolves(pokeApi)
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Assert your return is an Array, and length is the same as mock', async () => {
      const result = await pokedexService.read();

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(pokeApi.length)
      expect(result).to.deep.equal(pokeApi)
    }),


    it('2) - Check object properties', async () => {
      const result = await pokedexService.read()

      if (result instanceof Array) {
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
      }
    })
  })

  describe('2.2) - Testing getOne Pokedex Service', () => {
    before(() => {
      Sinon.stub(pokedexService.model, 'readOne').resolves(pokeApi[0])
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Assert your return is an Object', async () => {
      const result = await pokedexService.readOne(pokeApi[0]._id)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(pokeApi[0])
    })
  });

  describe('3.1) - Testing Update of Pokedex Service', () => {
    before(() => {
      Sinon.stub(pokedexService.model, 'update').resolves(pokemonUpdateInput)
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Should return an Update Pokemon', async () => {
      const result = await pokedexService.update(pokemonInput._id, pokemonUpdateInput)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(pokemonUpdateInput)
    });
  });

  describe('3.2) - Testing partialUpdate of PokedexModel', () => {
    before(() => {
      Sinon.stub(pokedexService.model, 'partialUpdate').resolves(pokemonUpdateInput)
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Should return an Update Pokemon', async () => {
      const result = await pokedexService.partialUpdate(pokemonInput._id, pokemonPartialUpdateInput)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(pokemonUpdateInput)
    });
  });

  describe('4) - Testing Delete of Pokedex Service', () => {
    before(() => {
      Sinon.stub(pokedexService.model, 'delete').resolves(pokemonUpdateInput)
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Should return an Update Pokemon', async () => {
      const result = await pokedexService.delete(pokemonInput._id)

      expect(result).to.be.an('object')
      expect(result).to.deep.equal(pokemonUpdateInput)
    });
  });
})
