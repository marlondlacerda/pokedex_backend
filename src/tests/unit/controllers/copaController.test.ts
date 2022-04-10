import chai from "chai"
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import pokeApi from "../mocks";

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Endpoint /pokedex', () => {
  let chaiHttpResponse: Response;

  describe('If return is successful', () => {
    it("1) Return status 200 and the data of all Pokemons", async () => {

      chaiHttpResponse = await chai
      .request('http://localhost:3000')
      .get('/pokedex');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.have.length(pokeApi.length);
      expect(body).to.be.deep.equal(pokeApi);
    })
  })
})
