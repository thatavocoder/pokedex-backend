import mongoose from 'mongoose';

const pokemonDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  base_experience: {
    type: Number,
    required: true,
  },
  abilities: {
    type: [String],
    required: true,
  },
  types: {
    type: [String],
    required: true,
  },
});

export default mongoose.model('PokemonDetails', pokemonDetailsSchema);
