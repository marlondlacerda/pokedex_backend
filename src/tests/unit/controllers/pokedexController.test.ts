import chai from 'chai';
import chaiHttp from 'chai-http';

import pokeApi from "../mocks";

import { PokedexController } from '../../../controllers';
import Sinon from 'sinon';
import { Request, Response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('1) - Test route of class Controller', () => {
  let pokedexController = new PokedexController()

  it('pokedexController.route should be /pokedex', () => {
    expect(pokedexController.route).to.equal('/pokedex')
  });
})

describe('Testing Endpoint /pokedex', () => {
  describe('1) - Test the route of the Controller', () => {
    let pokedexController = new PokedexController()
    let request: any = {};
    let response: any = {};

    describe("2) - Test read Controller when use .get", async () => {
      before(() => {
        Sinon.stub(pokedexController.service, 'read').resolves(pokeApi)

        request = {};
        response = {
          status: (status: number) => {
            return {
              json: (data: any) => ({ status, json: data })
            }
          }
        }
      });
  
      after(() => {
        Sinon.restore();
      });

      it('Assert status and json of return is equal 200 and same of api', async () => {
        const result = await pokedexController.read(request as Request, response);

        expect(result.status).to.equal(200);
        expect(result.json).to.be.an('array');
        expect(result.json.length).to.equal(pokeApi.length);
        expect(result.json).to.deep.equal(pokeApi);
      })
    })

    describe("3) - Test create Controller when use .post", async () => {
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
        Sinon.stub(pokedexController.service, 'create').resolves(newPokemon)

        response = {
          status: (status: number) => {
            return {
              json: (data: any) => ({ status, json: data })
            }
          }
        }
      });

      after(() => {
        Sinon.restore();
      });
      
      it('Assert status and json of return is equal 201 and same of api', async () => {
        const result = await pokedexController.create(request, response);
        expect(result.status).to.equal(201);
        expect(result.json).to.be.an('object');
        expect(result.json).to.deep.equal(newPokemon);
      })
    })
  })
})
