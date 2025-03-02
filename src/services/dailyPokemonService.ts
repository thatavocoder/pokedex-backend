import axios from 'axios';
import Pokemon from '../models/Pokemon';
import PokemonDetails from '../models/PokemonDetails';

interface Species {
  name: string;
  url: string;
}

interface Sprites {
  front_default: string;
  other: {
    showdown: {
      front_default: string;
    };
  };
}

interface PokemonData {
  name: string;
  species: Species;
  sprites: Sprites;
}

interface SpeciesData {
  color: {
    name: string;
  };
}

export interface PokemonDetails {
  name: string;
  image_url: string;
  id: number;
  color: string;
}

export class RandomPokemonService {
  public static async getDailyPokemon(): Promise<PokemonDetails> {
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

      const pokemonDetails: PokemonDetails = {
        name: pokemonData.data.name,
        image_url: pokemonData.data.sprites.other.showdown.front_default,
        id: dailyPokemon.id,
        color: pokemonSpeciesData.data.color.name,
      };

      await PokemonDetails.create(pokemonDetails);

      return pokemonDetails;
    } catch (error) {
      console.error('Error fetching daily Pokemon:', error);
      throw new Error('Error fetching daily Pokemon');
    }
  }
}
