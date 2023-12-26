import Search from '@/components/Search';
import PokemonList from '@/components/PokemonList';
const SearchPage = ({ params: { search } }) => {
  console.log(search, 'ii');
  return (
    <div>
      <Search />
      <PokemonList />
    </div>
  );
};

export default SearchPage;
