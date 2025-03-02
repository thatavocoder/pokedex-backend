import { Request, Response } from 'express';
import { RandomPokemonService } from '../services/dailyPokemonService';

export const getRandomPokemon = async (req: Request, res: Response) => {
  const dailyPokemon = await RandomPokemonService.getDailyPokemon();

  res.json({
    success: true,
    data: dailyPokemon,
  });
};
