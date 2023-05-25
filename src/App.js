import './App.css'
import {Pokemon} from './pokemons/pokemon.component'
import { useBattle } from './useBattle';



export function App() {
  const [battleState, togglePlayPause] = useBattle({
    name: "pikachu",
    img: "http://pokemon.lux.frachet.berthelot.io/api/img/back/pikachu.gif",
  }, {
    name: "salamèche",
    img: "http://pokemon.lux.frachet.berthelot.io/api/img/charmander.gif",
  })

  return (
      <main>
        <h1>Bataille de pokémon!</h1>
        <section>
          <h2>L'arène</h2>
          <div className="arena">
            <Pokemon pokemon={battleState.attacker} testid="attacker" />
            <Pokemon pokemon={battleState.defender} testid="defender" />
          </div>
        </section>
        <button type="button" onClick={togglePlayPause}>{battleState.isPaused ? 'play' : 'pause'}</button>
        <section data-testid="logs">
          <ul>
            {
              battleState.logs.map((log) => {
                return <li key={log.id}>{log.message}</li>
              })
            }
            </ul>
        </section>
      </main>
  );
}


