import { expect } from "chai";
import Sinon from "sinon";

import { LoginModel } from "../../../models"
import { LoginService } from "../../../services";
import { Authenticator } from "../../../middlewares";
import { userInput } from "../inputs";
import { Login, User } from "../mocks";


describe('Unit Test - Login Service', () => {
  const authenticator = new Authenticator();
  const loginModel = new LoginModel();
  const loginService = new LoginService(loginModel, authenticator)

  describe('1) - Testing readOne Login Service', () => {
    before(() => {
      Sinon.stub(loginService.model, 'readOne').callsFake(Login.readOne);
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Your return is a string with token', async () => {
      const result = await loginService.login(userInput);

      expect (result).to.be.an('string');
    })

  })
})
