import { Request, Response } from 'express';
import { RandomPokemonService } from '../services/randomPokemonService';

export const getRandomPokemon = async (req: Request, res: Response) => {
  try {
    const dailyPokemon = await RandomPokemonService.getDailyPokemon();

    res.json({
      success: true,
      data: dailyPokemon,
    });
  } catch (error) {
    console.error('Error fetching daily Pokemon:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching daily Pokemon',
    });
  }
};
