import axios from 'axios';
import Pokemon from '../models/Pokemon';
import PokemonDetails from '../models/PokemonDetails';

interface PokemonData {
  name: string;
  url: string;
  id: number;
}

export class PokemonService {
  private static readonly API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

  public static async getPokemonList(search?: string): Promise<PokemonData[]> {
    const count = await Pokemon.countDocuments();

    if (count === 0) {
      await this.fetchAndStorePokemon();
    }

    if (search) {
      return this.searchPokemon(search);
    }

    return this.getStoredPokemon();
  }

  private static async searchPokemon(search: string): Promise<PokemonData[]> {
    return Pokemon.find({
      name: { $regex: search, $options: 'i' },
    }).sort('id');
  }

  private static async fetchAndStorePokemon(): Promise<PokemonData[]> {
    try {
      // Clear existing data first
      await Pokemon.deleteMany({});

      const response = await axios.get(this.API_URL);
      const pokemonList = response.data.results;

      const pokemonWithIds = pokemonList.map((pokemon: any) => ({
        name: pokemon.name,
        url: pokemon.url,
        id: parseInt(pokemon.url.split('/')[6]),
      }));

      await Pokemon.insertMany(pokemonWithIds);
      return pokemonWithIds;
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      throw error;
    }
  }

  private static async getStoredPokemon(): Promise<PokemonData[]> {
    return Pokemon.find().sort('id');
  }
}
