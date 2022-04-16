const chai = require('chai')
const chaiHttp = require('chai-http')

import { Response } from 'superagent';

import { invalidUserEmail, invalidUserPassword, user } from './inputs';

import App from '../../app';
import { LoginFactory } from '../../Factories'
import { HandlerError, ZodHandlerError } from '../../middlewares';

const app = new App();
const handleError = new HandlerError();
const zodHandlerError = new ZodHandlerError();
const loginFactory = LoginFactory.createLoginRouter();

app.addRouter(loginFactory);
app.errorRouter(handleError, zodHandlerError);

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration Test - Endpoint "/login"', () => {
  describe('1) - When Login sucess', () => {
    it('1) - Shoud return status 200 and a token', async () => {
      const response: Response = await chai
      .request(app.app)
      .post(`/login`)
      .send(user);
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    });
  })

  describe('2) - When Login with invalid email or password', () => {
    it('1) - Shoud return error when email is invalid', async () => {
      const response: Response = await chai
      .request(app.app)
        .post('/login')
        .send(invalidUserEmail);

      const { status, body } = response;

      expect(status).to.equal(401);
      expect(body).to.have.property('error');
      expect(body.error).to.equal('Incorrect email or password');
    })
    
    it('2) - Shoud return error when password is invalid', async () => {
      const response: Response = await chai
      .request(app.app)
      .post('/login')
        .send(invalidUserPassword);
        
      const { status, body } = response;
      
      expect(status).to.equal(401);
      expect(body).to.have.property('error');
      expect(body.error).to.equal('Incorrect email or password');
    })
  })
})

