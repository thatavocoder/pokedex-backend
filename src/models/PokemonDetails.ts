import mongoose from 'mongoose';

const pokemonDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image_url: {
    type: String,
    required: true,
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
});

export default mongoose.model('PokemonDetails', pokemonDetailsSchema);
