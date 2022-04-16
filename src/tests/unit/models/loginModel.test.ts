import { expect } from "chai"
import Sinon from "sinon"

import { LoginModel } from "../../../models"
import { userInput } from "../inputs"

describe('Unit Test - Login Model', () => {
  const loginModel = new LoginModel()

  describe('1) - Testing readOne LoginModel', () => {
    before(() => {
      Sinon.stub(loginModel.model, 'findOne').resolves(userInput);
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Assert your return is an Array, and length is the same as mock', async () => {
      const result = await loginModel.readOne(userInput.email)

      expect(result).to.deep.equal(userInput);
    })
  })
})

