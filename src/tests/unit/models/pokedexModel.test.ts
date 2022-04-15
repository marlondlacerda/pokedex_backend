import { expect } from "chai"
import Sinon from "sinon"

import { PokedexModel } from "../../../models"
import pokeApi, { Pokemon } from "../mocks"

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
      expect(result).to.have.lengthOf(pokeApi.length)
      expect(result).to.deep.equal(pokeApi)
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

  describe('Testing Create of PokedexModel', () => {
    const newPokemon = {
      "_id": 3,
      "name": "Bulbasaur",
      "type": [
        "Grass",
        "Poison"
      ],
      "weight": {
        "value": 6.9,
        "measurement": "kg"
      },
      "height": {
        "value": 0.7,
        "measurement": "m"
      },
      "description": "There is a plant seed on its back right from the day this POKéMON is born. The seed slowly grows larger.",
      "baseStats": {
        "hp": 45,
        "atk": 49,
        "def": 49,
        "satk": 65,
        "sdef": 65,
        "spd": 45
      },
      "moves": {
        "skill1": "Growl",
        "skill2": "Tackle"
      },
      "image1": "https://archives.bulbagarden.net/media/upload/2/21/001Bulbasaur.png",
      "image2": "https://archives.bulbagarden.net/media/upload/7/76/Spr_5b_001.png"
    };

    before(() => {
      Sinon.stub(pokedexModel.model, 'create').callsFake(Pokemon.create)
    })

    after(() => {
      Sinon.restore();
      pokeApi.pop()
    });

    describe('Before being tested', () => {
      it('Should return 2 records', async () => {
        expect(pokeApi.length).to.be.equal(2)
      })
    })

    describe('After being tested', () => {
      it('Should return 3 records', async () => {
        const result = await pokedexModel.create(newPokemon)

        expect(pokeApi.length).to.be.equal(3)
        expect(result).to.be.an('object')
        expect(result).to.deep.equal(pokeApi[2])
      })
    })
  })
})
