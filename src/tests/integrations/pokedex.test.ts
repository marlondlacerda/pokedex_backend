import chai from 'chai';
import chaiHttp from 'chai-http';
import  mongoose from 'mongoose';

import { Response } from 'superagent';

import * as pokemon from './inputs';

import App from '../../app';
import { PokedexFactory, LoginFactory } from '../../Factories'
import { HandlerError } from '../../middlewares';
import pokedexArray from './matchs/pokedexArray';
import { pokemonPartialUpdated } from './matchs';

const app = new App();
const handleError = new HandlerError();
const pokedexFactory = PokedexFactory.createPokedexRouter();
const loginFactory = LoginFactory.createLoginRouter();

app.addRouter(pokedexFactory);
app.addRouter(loginFactory);
app.errorRouter(handleError);

chai.use(chaiHttp);

const { expect } = chai;

const generateToken = async (): Promise<string> => {
  const response: Response = await chai
  .request(app.app)
  .post(`/login`)
  .send(pokemon.validUser)

  const { token } = response.body;

  return token;
}

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

  describe('2) -When use the method .post to add a new pokemon', () => {
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

  describe('3) - When use the method .get to getAll Data of Pokemons', () => {
    before(async () => {
      mongoose.connection.db.collection('pokedex').deleteOne({ _id: 3});
    });

    describe('1) - When success', () => {
      it('1) - Shoud return status 200 a an array of pokemons', async () => {
        
        const response: Response = await chai
        .request(app.app)
        .get(`/pokedex`)
        
        const { status, body } = response;

        expect(status).to.be.equal(200);
        expect(body).to.be.an('array');
        expect(body).to.have.lengthOf(2);
        expect(body).to.be.deep.equal(pokedexArray);
      });
    })
  })

  describe('4.1) - When use the method .put to update a pokemon', () => {
    describe('1) - When success', () => {
      after(async () => {
        await  mongoose.connection.db.collection('pokedex')
          .findOneAndReplace({ _id: 2 }, pokedexArray[1])
      });

      it('1) - Shoud return status 200 and a pokemon updated', async () => {
        const response: Response = await chai
        .request(app.app)
        .put(`/pokedex/2`)
        .set('Authorization', await generateToken())
        .send(pokemon.pokemonUpdateInput);

        const { status, body } = response;

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(pokemon.pokemonUpdateInput);

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
    })

    describe('2) - When fail', () => {
      describe('1) - When try to change _id of pokemon', () => {
        it('1) - Shoud return status 400 and an error', async () => {
          const response: Response = await chai
          .request(app.app)
          .put(`/pokedex/2`)
          .set('Authorization', await generateToken())
          .send(pokemon.pokemonInvalidUpdateInput);

          const { status, body } = response;

          expect(status).to.be.equal(400);
          expect(body).to.have.property('error');
          expect(body.error).to.equal('_id is immutable');
        });
      });

      describe('2 - When try to change with non existent _id', () => {
        it('1) Should return status 404 and an error', async () => {
          const response: Response = await chai
          .request(app.app)
          .put(`/pokedex/9999`)
          .set('Authorization', await generateToken())
          .send(pokemon.pokemonInvalidUpdateInput);

          const { status, body } = response;

          expect(status).to.be.equal(404);
          expect(body).to.have.property('error');
          expect(body.error).to.equal('Oh noes, there\'s nothing in here! Page not found!');
        });
      });
    });
  });

  describe('4.2) - When use the method .patch to update a pokemon', () => {
    describe('1) - When success', () => {
      after(async () => {
        await  mongoose.connection.db.collection('pokedex')
          .findOneAndReplace({ _id: 2 }, pokedexArray[1])
      });

      it('1) - Shoud return status 200 and a pokemon updated', async () => {
        const response: Response = await chai
        .request(app.app)
        .patch(`/pokedex/2`)
        .set('Authorization', await generateToken())
        .send(pokemon.pokemonPartialInput);

        const { status, body } = response;

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(pokemonPartialUpdated);

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
    })

    describe('2) - When fail', () => {
      describe('1) - When try to change _id of pokemon', () => {
        it('1) - Shoud return status 400 and an error', async () => {
          const response: Response = await chai
          .request(app.app)
          .patch(`/pokedex/2`)
          .set('Authorization', await generateToken())
          .send(pokemon.pokemonPartialInvalidInput);

          const { status, body } = response;

          expect(status).to.be.equal(400);
          expect(body).to.have.property('error');
          expect(body.error).to.equal('_id is immutable');
        });
      });

      describe('2 - When try to change with non existent _id', () => {
        it('1) Should return status 404 and an error', async () => {
          const response: Response = await chai
          .request(app.app)
          .patch(`/pokedex/9999`)
          .set('Authorization', await generateToken())
          .send(pokemon.pokemonPartialInput);

          const { status, body } = response;

          expect(status).to.be.equal(404);
          expect(body).to.have.property('error');
          expect(body.error).to.equal('Oh noes, there\'s nothing in here! Page not found!');
        });
      });

      describe('3) - When try to change with invalid data', () => {
        it('1) Should return status 400 and an error', async () => {
          const response: Response = await chai
          .request(app.app)
          .patch(`/pokedex/2`)
          .set('Authorization', await generateToken())
          .send(pokemon.partialInvalid);

          const { status, body } = response;

          expect(status).to.be.equal(400);
          expect(body).to.have.property('error');
          expect(body.error).to.equal('Name must be a string');
        });
      })
    });
  });

  describe('5) - When use the method .delete to delete a pokemon', () => {
    describe('1) - When success', () => {
      before(async () => {
        await chai.request(app.app)
          .post('/pokedex')
          .set('Authorization', await generateToken())
          .send(pokemon.newPokemon);
      });

      it('1) - Shoud return status 200 and a pokemon deleted', async () => {
        const response: Response = await chai
        .request(app.app)
        .delete(`/pokedex/3`)
        .set('Authorization', await generateToken());

        const { status, body } = response;

        expect(status).to.be.equal(200);
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
    })

    describe('2) - When fail', () => {
      describe('1) - When try to delete with non existent _id', () => {
        it('1) Should return status 404 and an error', async () => {
          const response: Response = await chai
          .request(app.app)
          .delete(`/pokedex/9999`)
          .set('Authorization', await generateToken());

          const { status, body } = response;

          expect(status).to.be.equal(404);
          expect(body).to.have.property('error');
          expect(body.error).to.equal('Oh noes, there\'s nothing in here! Page not found!');
        });
      });
    });
  });
});
