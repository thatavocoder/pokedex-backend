import { Request, Response } from 'express';
import { PokemonService } from '../services/pokemonService';

export const getPokemonList = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;

    if (search && search.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Search term must be at least 3 characters long',
      });
    }

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

export const getPokemonById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const pokemon = await PokemonService.getPokemonById(id);

  res.json({
    success: true,
    data: pokemon,
  });
};
