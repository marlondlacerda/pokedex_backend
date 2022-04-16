import { expect } from "chai";
import Sinon from "sinon";

import { LoginService } from "../../../services";
import { Login, User } from "../mocks";

describe('1) - Pokedex Service', () => {
  let loginService = new LoginService()

  describe('1) - Testing readOne Pokedex Service', () => {

    const user = {
  email: 'miltin@test.com',
  password: '123456'
}

    before(() => {
      Sinon.stub(loginService.model, 'readOne').callsFake(Login.readOne);
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Assert your return is a string with password of UserMock', async () => {
      const result = await loginService.login(user);
      
      expect (result).to.be.an('string');
      expect (result).to.equal(User[0].password);
    })

  })
})
