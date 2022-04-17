import chai from 'chai';
import chaiHttp from 'chai-http';
import  mongoose from 'mongoose';

import { Response } from 'superagent';

import * as pokemon from './inputs';

import App from '../../app';
import { PokedexFactory, LoginFactory } from '../../Factories'
import { HandlerError, ZodHandlerError } from '../../middlewares';

const app = new App();
const handleError = new HandlerError();
const zodHandlerError = new ZodHandlerError();
const pokedexFactory = PokedexFactory.createPokedexRouter();
const loginFactory = LoginFactory.createLoginRouter();

app.addRouter(pokedexFactory);
app.addRouter(loginFactory);
app.errorRouter(handleError, zodHandlerError);

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration Test - Endpoint "/pokedex"', () => {
  describe('1) - When try to request with invalid token or no token',() =>{
    it('1) - Shoud return error when token is invalid', async () => {
      const response: Response = await chai
        .request(app.app)
        .post('/pokedex')
        .set('Authorization', 'Bearer invalidToken')
        .send(pokemon.validUser);

      const { status, body } = response;

      expect(status).to.equal(401);
      expect(body).to.have.property('error');
      expect(body.error).to.equal('Invalid token');
    })

    it('2) - Shoud return error when token is not provided', async () => {
      const response: Response = await chai
        .request(app.app)
        .post('/pokedex')
        .send(pokemon.newPokemon);

      const { status, body } = response;

      expect(status).to.equal(401);
      expect(body).to.have.property('error');
      expect(body.error).to.equal('No token provided');
    });
  });

  describe('2) - When route use .post to add a new pokemon', () => {
    const generateToken = async (): Promise<string> => {
      const response: Response = await chai
      .request(app.app)
      .post(`/login`)
      .send(pokemon.validUser)

      const { token } = response.body;

      return token;
    }

    // delete collection on before start test
    before(async () => {
      await mongoose.connection.db.collection('pokedex').drop();
    });

    it('1) - Shoud return status 201 and a new pokemon', async () => {
      const response: Response = await chai
        .request(app.app)
        .post(`/pokedex`)
        .set('Authorization', await generateToken())
        .send(pokemon.newPokemon);

      const { status, body } = response;

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(pokemon.newPokemon);
      expect(body).to.have.property('_id');
      expect(body).to.have.property('name');
      expect(body).to.have.property('type');
      expect(body).to.have.property('weight');
      expect(body).to.have.property('height');
      expect(body).to.have.property('description');
      expect(body).to.have.property('baseStats');
      expect(body).to.have.property('moves');
      expect(body).to.have.property('image1');
      expect(body).to.have.property('image2');
    });

    it('2) - Should return error when try to add a pokemon with duplicate _id', async () => {
      const response: Response = await  chai
            .request(app.app)
            .post(`/pokedex`)
            .set('Authorization', await generateToken())
            .send(pokemon.newPokemon)

      const { status, body } = response;

      expect(status).to.be.equal(400);
      expect(body).to.have.property('error');
      expect(body.error).to.equal('Duplicate _id');
    })

    it('3) - Should return error when try to add a pokemon with invalid input', async () => {
      const response: Response = await chai
            .request(app.app)
            .post(`/pokedex`)
            .set('Authorization', await generateToken())
            .send(pokemon.invalidPokemon)

      const { status, body } = response;

      expect(status).to.be.equal(400);
      expect(body).to.have.property('error');
      expect(body.error).to.equal('Name must be a string');
    });
  });

  describe('3) - When route use .get', () => {
    describe('1) - When success', () => {
      it('1) - Shoud return status 200 a an array of pokemons', async () => {
        
        const response: Response = await chai
        .request(app.app)
        .get(`/pokedex`)
        
        const { status, body } = response;

        expect(status).to.be.equal(200);
        expect(body).to.be.an('array');
      });
    })
  })
})
