import axios from 'axios';
import Pokemon from '../models/Pokemon';
import { PokemonData, iPokemonDetails } from '../types/pokemon-details';
import { SpeciesData } from '../types/pokemon-species';
import PokemonDetails from '../models/PokemonDetails';

export class RandomPokemonService {
  public static async getDailyPokemon(): Promise<iPokemonDetails> {
    try {
      const count = await Pokemon.countDocuments();

      const randomIndex = Math.floor(Math.random() * count);

      const dailyPokemon = await Pokemon.findOne().skip(randomIndex);

      const detailsApiUrl = dailyPokemon?.url;

      if (!detailsApiUrl) {
        throw new Error('No daily Pokemon found');
      }

      const pokemonData = await axios.get<PokemonData>(detailsApiUrl);

      const pokemonSpeciesData = await axios.get<SpeciesData>(pokemonData.data.species.url);

      const pokemonDetails: iPokemonDetails = {
        name: pokemonData.data.name,
        image_url: pokemonData.data.sprites.other.showdown.front_default,
        id: dailyPokemon.id,
        color: pokemonSpeciesData.data.color.name,
        height: pokemonData.data.height,
        weight: pokemonData.data.weight,
        base_experience: pokemonData.data.base_experience,
        abilities: pokemonData.data.abilities.map((ability: any) => ability.ability.name),
        types: pokemonData.data.types.map((type: any) => type.type.name),
      };

      await PokemonDetails.create(pokemonDetails);

      return pokemonDetails;
    } catch (error) {
      console.error('Error fetching daily Pokemon:', error);
      throw new Error('Error fetching daily Pokemon');
    }
  }
}
