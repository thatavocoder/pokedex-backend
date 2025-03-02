import { Request, Response } from 'express';
import { PokemonService } from '../services/pokemonService';

export const getPokemonList = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;

    const pokemons = await PokemonService.getPokemonList(search);

    res.json({
      success: true,
      count: pokemons.length,
      data: pokemons,
    });
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching Pokemon list',
    });
  }
};
