import { RequestHandler, Router } from 'express';
import { getPokemonList } from '../controllers/pokemonController';
import { getRandomPokemon } from '../controllers/dailyPokemonController';
import { getPokemonById } from '../controllers/pokemonByIdController';

const router = Router();

router.get('/', getPokemonList as RequestHandler);

router.get('/random', getRandomPokemon as RequestHandler);

router.get('/:id', getPokemonById as RequestHandler);

export default router;
