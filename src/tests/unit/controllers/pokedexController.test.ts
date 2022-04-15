import chai from 'chai';
import chaiHttp from 'chai-http';

import pokeApi from "../mocks";
import pokemonInput from "../inputs";
import { PokedexController } from '../../../controllers';
import Sinon from 'sinon';
import { Request, Response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('Pokedex Controller', () => {
  describe('1) Test route of class Controller', () => {
    let pokedexController = new PokedexController()
  
    it('1) - pokedexController.route should be /pokedex', () => {
      expect(pokedexController.route).to.equal('/pokedex')
    });
  })

  describe('2) - Test your functions', () => {
    let pokedexController = new PokedexController()
    let request: any = {};
    let response: any = {};

    describe("1) - Test read Controller when use .get", async () => {
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

      it('1) - Assert status and json of return is equal 200 and same of api', async () => {
        const result = await pokedexController.read(request as Request, response);

        expect(result.status).to.equal(200);
        expect(result.json).to.be.an('array');
        expect(result.json.length).to.equal(pokeApi.length);
        expect(result.json).to.deep.equal(pokeApi);
      })
    })

    describe("2) - Test create Controller when use .post", async () => {
      before(() => {
        Sinon.stub(pokedexController.service, 'create').resolves(pokemonInput)

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
      
      it('1) - Assert status and json of return is equal 201 and same of api', async () => {
        const result = await pokedexController.create(request, response);
        expect(result.status).to.equal(201);
        expect(result.json).to.be.an('object');
        expect(result.json).to.deep.equal(pokemonInput);
      })
    })
  })
})
