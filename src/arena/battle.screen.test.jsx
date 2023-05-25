import { render, screen, waitFor } from '@testing-library/react';
import {BattleScreen} from './battle.screen';
import nock from 'nock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        attacker: 'pikachu',
        defender: 'charmander',
    })
  }));

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


describe('Battle Screen', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })
    afterEach(() => {
        jest.spyOn(console, 'error').mockRestore()
    })

  it('should display loading when request to pokeAPI has not yet answer', async () => {
    nock('https://pokeapi.co')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true' 
            })
            .get('/api/v2/pokemon/pikachu')
            .reply(404, 'not_found')
            .get('/api/v2/pokemon/charmander')
            .reply(404, 'not_found');

    render(<BattleScreen />, {wrapper: Wrapper})

    expect(screen.getByText('loading...')).toBeVisible()

    await waitFor(() => {
        expect(screen.queryByText('loading...')).toBe(null)
    })
  })

  it('should display an error message when request to pokeAPI failed', async () => {
    
    nock('https://pokeapi.co')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true' 
            })
            .get('/api/v2/pokemon/pikachu')
            .reply(404, 'not_found')
            .get('/api/v2/pokemon/charmander')
            .reply(404, 'not_found');

    render(<BattleScreen />, {wrapper: Wrapper})

    await waitFor(() => {
        expect(screen.queryByText('loading...')).toBe(null)
    })

    expect(screen.getByText('Erreur avec la pokéAPI')).toBeVisible()
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
            })
            .get('/api/v2/pokemon/charmander')
            .reply(200, {
                name: 'salamèche',
                sprites: {
                    front_default: 'sala_back_default'
                }
            });

    render(<BattleScreen />, {wrapper: Wrapper})

    await waitFor(() => {
        expect(screen.queryByText('loading...')).toBe(null)
    })

    expect(screen.getByText('pikachu')).toBeVisible()
  })
})

