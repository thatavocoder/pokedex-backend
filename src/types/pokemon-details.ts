export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  front_default: string;
  other: {
    showdown: {
      front_default: string;
    };
  };
}

export interface Ability {
  ability: {
    name: string;
  };
}

export interface Type {
  type: {
    name: string;
  };
}

export interface PokemonData {
  name: string;
  species: Species;
  sprites: Sprites;
  height: number;
  weight: number;
  base_experience: number;
  abilities: Ability[];
  types: Type[];
}

export interface iPokemonDetails {
  name: string;
  image_url: string;
  id: number;
  color: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: string[];
  types: string[];
}
