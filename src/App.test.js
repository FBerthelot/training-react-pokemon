import { render, screen, waitFor } from '@testing-library/react';
import {App} from './App';
import nock from 'nock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  }
});
const Wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);


describe('Pokemon Arena', () => {
  
  it('should display loading when request to pokeAPI has not yet answer', () => {
    render(<App />, {wrapper: Wrapper})

    expect(screen.getByText('loading...')).toBeVisible()
  })

  fit('should display an error message when request to pokeAPI failed', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    nock('https://pokeapi.co')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true' 
      })
      .get('/api/v2/pokemon/pikachu')
      .reply(404, 'Not_Found');

    nock('https://pokeapi.co')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true' 
      })
      .get('/api/v2/pokemon/charmander')
      .reply(404, 'Not_Found');

    render(<App />, {wrapper: Wrapper})

    await waitFor(() => {
      expect(screen.queryByText('loading...')).toBe(null)
    })

    expect(screen.getByText('Erreur avec la pokéAPI')).toBeVisible()

    jest.spyOn(console, 'error').mockRestore()
  })

  it('should display an the arena when request to pokeAPI succeed', async () => {
    nock('https://pokeapi.co')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true' 
      })
      .get('/api/v2/pokemon/pikachu')
      .reply(200, {
        name: 'pikachu',
        sprites: {
            back_default: 'pika_back_default'
        }
    });

    nock('https://pokeapi.co')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true' 
      })
      .get('/api/v2/pokemon/charmander')
      .reply(200, {
        name: 'salamèche',
        sprites: {
            front_default: 'sala_back_default'
        }
    });

    render(<App />, {wrapper: Wrapper})

    await waitFor(() => {
      expect(screen.queryByText('loading...')).toBe(null)
    })

    expect(screen.getByText('pikachu')).toBeVisible()
  })
})

