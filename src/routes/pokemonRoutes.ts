import { RequestHandler, Router } from 'express';
import { getPokemonList } from '../controllers/pokemonController';
import { getRandomPokemon } from '../controllers/dailyPokemonController';

const router = Router();

router.get('/', getPokemonList as RequestHandler);

router.get('/random', getRandomPokemon as RequestHandler);

export default router;
