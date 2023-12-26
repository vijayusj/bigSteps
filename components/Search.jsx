'use client';
import { useState } from 'react';
import Image from 'next/image';

import { usePokemonContext } from '@/context/PokemonContext';
import img from '../public/pokemon2.jpg';
import '@/styles/search.scss';
import { useRouter } from 'next/navigation';

const Search = () => {
  const { types, getPokemonByType, getSearchResults } = usePokemonContext();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Choose Type');
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const onSearch = (e) => {
    e.preventDefault();
    // router.push(`/${query}`, { scroll: false });
    // router.push(`/?search=true`, { scroll: false });
    getSearchResults(query);
    // redirect(`/${query}`);
  };
  return (
    <div className="search_container">
      <Image
        src={img}
        fill
        alt="headPoster"
        placeholder="blur"
        priority
        quality={50}
      />
      <div className="search">
        <input
          type="text"
          placeholder="Enter Pokemon Name or id.."
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key && e.key == 'Enter') {
              onSearch(e);
            }
          }}
        />
        <button onClick={onSearch}>Search</button>
      </div>
      <div className="dropdown_container">
        <div className="default" onClick={() => setToggle(!toggle)}>
          {type}
          <span>▾</span>
        </div>
        {toggle && (
          <ul className="dropdown_list">
            {types?.map((opt) => {
              return (
                <li
                  key={opt.name}
                  value={opt.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setType(e.target.textContent);
                    setToggle(false);
                    getPokemonByType(e.target.textContent);
                  }}
                >
                  {opt.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
