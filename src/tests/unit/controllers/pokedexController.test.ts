import { Request } from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';

import { PokedexService } from '../../../services';
import { PokedexController } from '../../../controllers';
import { pokemonInput, pokemonUpdateInput } from "../inputs";
import pokeApi from "../mocks";
import { PokedexModel } from '../../../models';

chai.use(chaiHttp);

const { expect } = chai;

describe('Unit Test - Pokedex Controller', () => {
  const pokedexModel = new PokedexModel();
  const pokedexService = new PokedexService(pokedexModel);
  const pokedexController = new PokedexController(pokedexService)

  describe('1) Test route of class Controller', () => {

  
    it('1) - pokedexController.route should be /pokedex', () => {
      expect(pokedexController.route).to.equal('/pokedex')
    });
  })

  describe('2) - Test your functions', () => {
    let request: any = {};
    let response: any = {};

    describe("1) - Test create Controller when use .post", async () => {
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
    describe("2.1) - Test read Controller when use .get", async () => {
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

    describe("2.2) - Test read Controller when use .get with id", async () => {
      before(() => {
        Sinon.stub(pokedexController.service, 'readOne').resolves(pokeApi[0])

        request = { params: { id: 1 } };
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
        const result = await pokedexController.readOne(request, response);

        expect(result.status).to.equal(200);
        expect(result.json).to.be.an('object');
        expect(result.json).to.deep.equal(pokeApi[0]);
      })
    });

    describe("3.1) - Test update Controller when use .put", async () => {
      before(() => {
        Sinon.stub(pokedexController.service, 'update').resolves(pokemonUpdateInput)

        request = {
          params: {
            _id: 1
          },
        }

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
        const result = await pokedexController.update(request, response);
        expect(result.status).to.equal(200);
        expect(result.json).to.be.an('object');
        expect(result.json).to.deep.equal(pokemonUpdateInput);
      })
    });

    describe('3.2) - Test partialUpdate Controller when use .patch', async () => {
      before(() => {
        Sinon.stub(pokedexController.service, 'partialUpdate').resolves(pokemonUpdateInput)

        request = {
          params: {
            _id: 1
          },
        }

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
        const result = await pokedexController.partialUpdate(request, response);

        expect(result.status).to.equal(200);
        expect(result.json).to.be.an('object');
        expect(result.json).to.deep.equal(pokemonUpdateInput);
      })
    });

    describe('4) - Test delete Controller when use .delete', async () => {
      before(() => {
        Sinon.stub(pokedexController.service, 'delete').resolves(pokemonUpdateInput)

        request = {
          params: {
            _id: 1
          },
        }

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
        const result = await pokedexController.delete(request, response);

        expect(result.status).to.equal(200);
        expect(result.json).to.be.an('object');
        expect(result.json).to.deep.equal(pokemonUpdateInput);
      })
    });
  })
})
