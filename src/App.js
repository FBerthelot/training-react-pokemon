import './App.css'
import {Pokemon} from './pokemons/pokemon.component'

export function App() {
  const attacker = {
    name: "pikachu",
    img: "http://pokemon.lux.frachet.berthelot.io/api/img/back/pikachu.gif",
    currentPv: 100,
    totalPv: 100
  };

  const defender = {
    name: "salamèche",
    img: "http://pokemon.lux.frachet.berthelot.io/api/img/charmander.gif",
    currentPv: 100,
    totalPv: 100
  };

  return (
      <main>
        <h1>Bataille de pokémon!</h1>
        <section>
          <h2>L'arène</h2>
          <div className="arena">
            <Pokemon pokemon={attacker} testid="attacker" />
            <Pokemon pokemon={defender} testid="defender" />
          </div>
        </section>
        <section>
            Battle is not started yet.
        </section>
      </main>
  );
}


