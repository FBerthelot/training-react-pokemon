import { useEffect, useState } from 'react';
import './App.css'
import {Pokemon} from './pokemons/pokemon.component'

export function App() {
  const [battleState, setBattleState] = useState({
    attacker: {
      name: "pikachu",
      img: "http://pokemon.lux.frachet.berthelot.io/api/img/back/pikachu.gif",
      currentPv: 100,
      totalPv: 100
    },
    defender: {
      name: "salamèche",
      img: "http://pokemon.lux.frachet.berthelot.io/api/img/charmander.gif",
      currentPv: 100,
      totalPv: 100
    },
    nextToAttack: 'attacker',
    winner: null,
    isPaused: true
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setBattleState((currentBattleState) => {
        if(currentBattleState.isPaused) {
          return currentBattleState;
        } 

        if(currentBattleState.winner) {
          clearInterval(interval);
          return currentBattleState;
        }

        const pokemonWhoLoseHpThisRound = currentBattleState.nextToAttack === 'attacker' ? 'defender': 'attacker'

        const newPv =  Math.max(currentBattleState[pokemonWhoLoseHpThisRound].currentPv - 10, 0);
        return {
          ...currentBattleState,
          [pokemonWhoLoseHpThisRound]: {
            ...currentBattleState[pokemonWhoLoseHpThisRound],
            currentPv: newPv
          },
          nextToAttack: pokemonWhoLoseHpThisRound,
          winner: newPv === 0 ? currentBattleState.nextToAttack : null
        }
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    };
  }, [])

  const togglePlayPause = () => {
    setBattleState((battleState) => ({
      ...battleState,
      isPaused: !battleState.isPaused
    }))
  }


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
        <section>
            Log incoming.
        </section>
      </main>
  );
}


