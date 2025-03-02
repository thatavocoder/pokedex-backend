import axios from 'axios';
import Pokemon from '../models/Pokemon';
import { PokemonData, iPokemonDetails } from '../types/pokemon-details';
import { SpeciesData } from '../types/pokemon-species';
import PokemonDetails from '../models/PokemonDetails';

export class PokemonByIdService {
  public static async getPokemonById(id: string): Promise<iPokemonDetails> {
    try {
      const pokemonDetails = await PokemonDetails.findOne({ id: parseInt(id) });

      if (!pokemonDetails) {
        const pokemon = await Pokemon.findOne({ id: parseInt(id) });

        if (!pokemon) {
          throw new Error('Pokemon not found');
        }

        const pokemonData = await axios.get<PokemonData>(pokemon.url);

        const pokemonSpeciesData = await axios.get<SpeciesData>(pokemonData.data.species.url);

        const pokemonDetails: iPokemonDetails = {
          name: pokemonData.data.name,
          image_url:
            pokemonData.data.sprites.other.showdown.front_default ??
            pokemonData.data.sprites.front_default,
          id: pokemon.id,
          color: pokemonSpeciesData.data.color.name,
          height: pokemonData.data.height,
          weight: pokemonData.data.weight,
          base_experience: pokemonData.data.base_experience,
          abilities: pokemonData.data.abilities.map((ability: any) => ability.ability.name),
          types: pokemonData.data.types.map((type: any) => type.type.name),
        };

        await PokemonDetails.create(pokemonDetails);

        return pokemonDetails;
      }

      return pokemonDetails;
    } catch (error) {
      console.error('Error fetching Pokemon by id:', error);
      throw new Error('Error fetching Pokemon by id');
    }
  }
}
