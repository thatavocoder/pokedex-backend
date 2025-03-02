import { PokemonByIdService } from '../services/pokemonByIdService';
import { Request, Response } from 'express';

export const getPokemonById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const pokemon = await PokemonByIdService.getPokemonById(id);

    res.json({
      success: true,
      data: pokemon,
    });
  } catch (error) {
    console.error('Error fetching Pokemon by id:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching Pokemon by id',
    });
  }
};
