import { expect } from "chai"
import Sinon from "sinon"
import tournamentsDocument from "../mocks"


describe('Copa Model', () => {
  let copaModel = new CopaModel()

  describe('Testing getAll CopaModel', () => {
    before(() => {
      Sinon.stub(copaModel.model, 'find').resolves(tournamentsDocument)
    })

    after(() => {
      Sinon.restore()
    });

    it('Returns all Worlds of Cup since from 1986 until 2018', async () => {
      const tournaments = await copaModel.find();
      expect(tournaments).to.be.an('array')
    })
  })
})
