import React from 'react';
import '@/styles/pokemonDetails.scss';

const PokemonDetails = async ({ id }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const { name, stats } = await res.json();
  // console.log(data);
  const maxStats = [255, 190, 250, 194, 250, 200];
  return (
    <section className="details_container">
      <div className="namee">{name}</div>
      <table className="stats">
        {stats?.map(({ base_stat, stat }, index) => {
          let percent = (base_stat / maxStats[index]) * 100;
          // console.log(percent);
          percent = percent.toFixed(0);

          return (
            <tbody key={stat.name}>
              <tr className="stat">
                <td className="name">{stat.name}</td>
                <td className="base">
                  {base_stat}
                  {/* {percent} */}
                </td>
                <td className="percentage">
                  <div className="line">
                    <div className="inner" style={{ width: `${percent}%` }}>
                      <span
                        className={`span${index + 1}`}
                        style={{
                          backgroundColor:
                            percent > 45
                              ? '#0ee75d'
                              : percent > 25
                              ? '#fb923c'
                              : '#ee2727',
                        }}
                      ></span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </section>
  );
};

export default PokemonDetails;
