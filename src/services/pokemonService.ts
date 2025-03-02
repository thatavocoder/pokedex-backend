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

  public static async getPokemonById(id: string) {
    const pokemon = await Pokemon.findOne({ id: parseInt(id) });

    if (!pokemon) {
      throw new Error('Pokemon not found');
    }

    const pokemonDetails = await PokemonDetails.findOne({ id: parseInt(id) });

    if (!pokemonDetails) {
      const { url: detailsApiUrl = '' } = pokemon;

      const pokemonData = await axios.get(detailsApiUrl);

      const pokemonSpeciesData = await axios.get(pokemonData.data.species.url);

      const { data: pokemonDetailsInfo } = pokemonData;

      const { data: pokemonSpeciesInfo } = pokemonSpeciesData;

      const pokemonDetails = {
        id: pokemonDetailsInfo.id,
        name: pokemonDetailsInfo.name,
        image_url: pokemonDetailsInfo.sprites.other.showdown.front_default,
        color: pokemonSpeciesInfo.color.name,
      };

      await PokemonDetails.create(pokemonDetails);

      return pokemonDetails;
    }

    return pokemonDetails;
  }
}
