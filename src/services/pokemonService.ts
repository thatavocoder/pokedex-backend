import axios from 'axios';
import Pokemon from '../models/Pokemon';

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

    if (search && search.length >= 3) {
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
    const response = await axios.get(this.API_URL);
    const pokemonList = response.data.results;

    const pokemonWithIds = pokemonList.map((pokemon: any) => ({
      name: pokemon.name,
      url: pokemon.url,
      id: parseInt(pokemon.url.split('/')[6]),
    }));

    await Pokemon.insertMany(pokemonWithIds);
    return pokemonWithIds;
  }

  private static async getStoredPokemon(): Promise<PokemonData[]> {
    return Pokemon.find().sort('id');
  }
}
