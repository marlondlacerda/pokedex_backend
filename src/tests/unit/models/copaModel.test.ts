import { expect } from "chai"
import Sinon from "sinon"
import CopaModel from "../../../models"
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
      const tournaments = await copaModel.read()

      expect(tournaments).to.be.an('array')
      expect(tournaments).to.have.lengthOf(tournamentsDocument.length)
      expect(tournaments[0]).to.have.property('year')
      expect(tournaments[0]).to.have.property('hostCountry')
      expect(tournaments[0]).to.have.property('champions')
      expect(tournaments[0]).to.have.property('runnerUp')
      expect(tournaments[0]).to.have.property('editionGoals')
      expect(tournaments[0]).to.have.property('editionStrikers')
      expect(tournaments[0]).to.have.property('bestPlayer')
      expect(tournaments[0]).to.have.property('bestGoalkeeper')
      expect(tournaments[0]).to.have.property('bestYoungPlayer')
      expect(tournaments).to.deep.equal(tournamentsDocument)
    })
  })
})
