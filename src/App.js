import { useQuery } from '@tanstack/react-query';
import './App.css'
import { Arena } from './arena/arena';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemonFetcher =   (id) => async () => {
  const response = await fetch(`${API_URL}${id}`)

  if(!response.ok) {
    throw new Error('Response was not OK');
  }

  return response.json()
}

export function App() {
  const pikaQuery = useQuery({
    queryKey: ['pikachu'],
    queryFn: pokemonFetcher('pikachu')
  })
  const salaQuery = useQuery({
    queryKey: ['salameche'],
    queryFn: pokemonFetcher('charmander')
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


