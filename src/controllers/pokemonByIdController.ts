import { PokemonByIdService } from '../services/pokemonByIdService';
import { Request, Response } from 'express';

export const getPokemonById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const pokemon = await PokemonByIdService.getPokemonById(id);

  res.json({
    success: true,
    data: pokemon,
  });
};
