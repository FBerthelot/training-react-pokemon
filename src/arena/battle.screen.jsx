import { useQuery } from '@tanstack/react-query';
import './battle.screen.css'
import { Arena } from './arena';
import { useParams } from 'react-router-dom';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemonFetcher =   (id) => async () => {
  const response = await fetch(`${API_URL}${id}`)

  if(!response.ok) {
    throw new Error('Response was not OK');
  }

  return response.json()
}

export function BattleScreen() {
    const {attacker, defender} = useParams()
    const pikaQuery = useQuery({
        queryKey: [attacker],
        queryFn: pokemonFetcher(attacker)
    })
    const salaQuery = useQuery({
        queryKey: [defender],
        queryFn: pokemonFetcher(defender)
    })

    if(salaQuery.isLoading || pikaQuery.isLoading) {
        return 'loading...';
    }

    if(salaQuery.error || pikaQuery.error) {
        return 'Erreur avec la pokéAPI'
    }

    return (
        <main>
            <h1>Bataille de pokémon!</h1>
            <Arena attacker={pikaQuery.data} defender={salaQuery.data} />
        </main>
    );
}


