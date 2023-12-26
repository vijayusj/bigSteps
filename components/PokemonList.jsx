'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Loading from './Loading';
import Link from 'next/link';
import '../styles/pokemonList.scss';
import { usePokemonContext } from '@/context/PokemonContext';
const PokemonList = React.memo(() => {
  const {
    next,
    loading,
    nextLoading,
    hasMore,
    search,
    allPokemonData: list,
  } = usePokemonContext();
  // console.log('nnn');

  const pkColors = [
    '#f8d5a3',
    '#f5b7b1',
    '#c39bd3',
    '#aed6f1',
    '#a3e4d7',
    '#f9e79f',
    '#fadbd8',
    '#d2b4de',
    '#a9cce3',
    '#a2d9ce',
    '#f7dc6f',
    '#f5cba7',
    '#bb8fce',
    '#85c1e9',
    '#76d7c4',
  ];
  useEffect(() => {}, [list]);

  return (
    <>
      {!loading ? (
        <div className="list_container">
          {list.length > 0
            ? list.map((li, index) => {
                const { id, name, types } = li;
                if (types) {
                  types.length = 4;
                }

                const color = pkColors[index % pkColors.length];
                // console.log(color);

                return (
                  <Link
                    href={`/pokemon/${id}?pokemon=${name}`}
                    scroll={false}
                    key={name}
                  >
                    <div
                      className="list_element"
                      style={{ backgroundColor: color }}
                    >
                      {' '}
                      <div className="img">
                        <Image
                          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
                          fill
                          alt="name"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/6.svg';
                          }}
                        />
                      </div>
                      <div className="details">
                        <div className="name">{name}</div>
                        <div className="types">
                          {types?.map((type) => {
                            return (
                              <p className="type" key={type?.type.name}>
                                {type.type.name}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            : search && (
                <div className="no_results">
                  <h2>Sorry! We couldn't find any matching Pokemon 😞 </h2>
                </div>
              )}

          {hasMore && list.length > 0 && (
            <div
              className="load_more"
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
            >
              {nextLoading ? 'Loading...' : 'LoadMore'}
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
});

export default PokemonList;
