import chai from 'chai';
import chaiHttp from 'chai-http';

import pokeApi from "../mocks";

import { PokedexController } from '../../../controllers';
import Sinon from 'sinon';
import { Request, Response } from 'express';
import { pokedexSchema } from '../../../schemas/PokedexSchema';
import createError from '../../../utils';

chai.use(chaiHttp);

const { expect } = chai;

describe('1) - Test route of class Controller', () => {
  let pokedexController = new PokedexController()

  it('pokedexController.route should be /pokedex', () => {
    expect(pokedexController.route).to.equal('/pokedex')
  });
})

describe('Testing Endpoint /pokedex', () => {

  describe('If return is successful', () => {
    let pokedexController = new PokedexController()
    let request: any = {};
    let response: any = {};

    describe("2) - Return status 200 and the data of all Pokemons", async () => {
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

      it('Assert your return is an Array, and length is the same as mock', async () => {
        const result = await pokedexController.read(request as Request, response);

        expect(result.status).to.equal(200);
        expect(result.json).to.be.an('array');
        expect(result.json.length).to.equal(pokeApi.length);
        expect(result.json).to.deep.equal(pokeApi);
      })
    })
  })
})
