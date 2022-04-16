import { Request } from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';

import { LoginModel } from '../../../models';
import { LoginService } from '../../../services';
import { LoginController } from '../../../controllers';
import { userInput } from "../inputs";
import { Authenticator } from '../../../middlewares';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Controller', () => {
  const authenticator = new Authenticator();
  const loginModel = new LoginModel();
  const loginService = new LoginService(loginModel, authenticator);
  const loginController = new LoginController(loginService)

  describe('1) Test route of class Controller', () => {

  
    it('1) - LoginController.route should be /login', () => {
      expect(loginController.route).to.equal('/login')
    });
  })

  describe('2) - Test your functions', () => {
    let request: any = {};
    let response: any = {};

    describe("1) - Test", async () => {
      before(() => {
        Sinon.stub(loginController.service, 'login').resolves('Eu sou um Token');

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
        const result = await loginController.handle(request, response);

        expect(result.status).to.equal(200);
        expect(result.json).to.be.an('object');
        expect(result.json).to.have.property('token');
      });
    })
  })
})
