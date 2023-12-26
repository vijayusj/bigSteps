import Image from 'next/image';
import PokemonDetails from '@/components/PokemonDetails';
import '@/styles/pokemonMain.scss';
export function generateMetadata({ searchParams: { pokemon } }) {
  return {
    title: pokemon,
  };
}
const PokemonPage = ({ params: { id } }) => {
  return (
    <div className="pokemon_container">
      <div className="image">
        <Image
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
          fill
          sizes="100%"
          alt="name"
          priority
        />
      </div>
      <div className="det">
        <PokemonDetails id={id} />
      </div>
    </div>
  );
};

export default PokemonPage;
