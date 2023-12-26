'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useMemo,
} from 'react';

const PokemonContext = createContext();

//actions
const LOADING = 'LOADING';
const GET_POKEMON = 'GET_POKEMON';
const GET_ALL_POKEMON = 'GET_ALL_POKEMON';
const GET_SEARCH = 'GET_SEARCH';
const GET_POKEMON_DATABASE = 'GET_POKEMON_DATABASE';
const TYPES = 'GET_TYPES';
const NEXT = 'NEXT';
const STOP_LOADING = 'STOP_LOADING';
const START_NEXT = 'START_NEXT';

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      if (action.payload) {
        // console.log('ii');
        const { name, value } = action.payload;
        return { ...state, loading: true, [name]: value };
      }
      return { ...state, loading: true };

    case GET_ALL_POKEMON:
      return {
        ...state,
        allPokemon: action.payload.results,
        next: action.payload.next,
        // loading: false,
        hasMore: true,
      };

    case GET_POKEMON:
      return { ...state, pokemon: action.payload, loading: false };

    case GET_POKEMON_DATABASE:
      return { ...state, pokemonDataBase: action.payload, loading: false };

    case GET_SEARCH:
      return { ...state, searchResults: action.payload, loading: false };

    case TYPES:
      return { ...state, types: action.payload };

    case NEXT:
      return {
        ...state,
        allPokemon: [...state.allPokemon, ...action.payload.results],
        next: action.payload.next,

        nextLoading: false,
      };

    case STOP_LOADING:
      // console.log(action);
      if (action.payload) {
        // console.log('ii');
        const { name, value } = action.payload;
        return { ...state, loading: false, [name]: value, search: false };
      }

      return { ...state, loading: false, search: false };

    case START_NEXT:
      return { ...state, nextLoading: true };

    default:
      return state;
  }
};

export const PokemonProvider = ({ children }) => {
  //base url
  const baseUrl = 'https://pokeapi.co/api/v2/';

  //initial state
  const intitialState = {
    allPokemon: [],
    pokemon: {},
    pokemonDataBase: [],
    searchResults: [],
    types: [],
    next: '',
    loading: true,
    nextLoading: false,
    hasMore: false,
    search: false,
  };

  const [state, dispatch] = useReducer(reducer, intitialState);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const getResults = async (data) => {
    const allPokemonData = [];

    for (const pokemon of data) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      // console.log(pokemonData, 'vija');
      allPokemonData.push(pokemonData);
    }
    return allPokemonData;
  };
  const allPokemon = async () => {
    dispatch({ type: 'LOADING' });

    const res = await fetch(`${baseUrl}pokemon?limit=24`);
    const data = await res.json();
    // console.log(data.results);
    dispatch({ type: 'GET_ALL_POKEMON', payload: data });

    //fetch character data
    const allPokemonData = await getResults(data.results);

    setAllPokemonData(allPokemonData);
  };
  //fetch all pokemon By Type
  const getPokemonByType = async (type) => {
    dispatch({ type: 'LOADING' });

    const res = await fetch(`${baseUrl}type/${type.trim()}`);
    const data = await res.json();
    const pokemons = data.pokemon;
    pokemons.length = 60;

    const allPokemonData = [];

    for (const { pokemon } of pokemons) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      allPokemonData.push(pokemonData);
    }

    setAllPokemonData(allPokemonData);
    // console.log('complete');
    dispatch({
      type: 'STOP_LOADING',
      payload: { name: 'hasMore', value: false },
    });
  };

  //get pokemon
  const getPokemon = async (name) => {
    dispatch({ type: 'LOADING' });

    const res = await fetch(`${baseUrl}pokemon/${name}`);
    const data = await res.json();

    dispatch({ type: 'GET_POKEMON', payload: data });
  };

  //get all pokemon data
  const getPokemonDatabase = async () => {
    // dispatch({ type: 'LOADING' });

    const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
    const data = await res.json();

    dispatch({ type: 'GET_POKEMON_DATABASE', payload: data.results });
    // console.log('ddd');
  };

  //next page
  const next = async () => {
    dispatch({ type: 'START_NEXT' });
    const res = await fetch(state.next);
    const data = await res.json();

    //fetch the new pokemon data
    const newPokemonData = await getResults(data.results);

    //add new pokemon data to the old pokemon data
    setAllPokemonData([...allPokemonData, ...newPokemonData]);
    dispatch({ type: 'NEXT', payload: data });
  };

  const getSearchResults = async (search) => {
    if (!search) return;
    dispatch({ type: 'LOADING', payload: { name: 'search', value: true } });

    const res = [];
    for (let pokemon of state.pokemonDataBase) {
      let idArr = pokemon.url.split('/');
      const id = idArr[idArr.length - 2];

      if (id == search) {
        res.push(pokemon);
        break;
      }
      if (pokemon.name.includes(search.toLowerCase())) {
        res.push(pokemon);
      }
    }
    const result = await getResults(res);
    setAllPokemonData(result);
    dispatch({
      type: 'STOP_LOADING',
      payload: { name: 'hasMore', value: false },
    });
  };
  //fetch types
  const getTypes = async () => {
    dispatch({ type: 'LOADING' });
    const types = await fetch(`${baseUrl}type`);
    const res = await types.json();
    // console.log(res.results);
    dispatch({ type: 'GET_TYPES', payload: res.results });
  };
  //initial fetch

  useEffect(() => {
    getTypes();
    allPokemon();
    getPokemonDatabase();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        ...state,
        allPokemonData,
        getPokemon,
        getPokemonByType,
        // realTimeSearch,
        getSearchResults,
        next,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};
