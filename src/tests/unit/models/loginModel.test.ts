import { expect } from "chai"
import Sinon from "sinon"

import { LoginModel } from "../../../models"

describe('1) - Login Model', () => {
  let loginModel = new LoginModel()

  describe('1) - Testing readOne LoginModel', () => {
    const user = {
      email: "email.test@.com",
      password: "123456",
    }

    before(() => {
      Sinon.stub(loginModel.model, 'findOne').resolves(user);
    })

    after(() => {
      Sinon.restore();
    });

    it('1) - Assert your return is an Array, and length is the same as mock', async () => {
      const user = {
        email: "email.test@.com",
        password: "123456",
      }

      const result = await loginModel.readOne(user.email)

      expect(result).to.deep.equal(user);
    })
  })
})

