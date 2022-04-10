import chai from "chai"
import chaiHttp = require('chai-http');

import tournamentsDocument from "../mocks"

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Endpoint /copas', () => {
  let chaiHttpResponse: Response;

  describe('If return is successful', () => {
    it("1) Return status 200 and the data of all clubs", async () => {

      chaiHttpResponse = await chai
      .request('http://localhost:3000')
      .get('/copas');

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.have.length(tournamentsDocument.length);
      expect(body).to.be.deep.equal(tournamentsDocument);
    })
  })
})
