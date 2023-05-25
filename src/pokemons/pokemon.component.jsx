import './pokemon.css'

export const Pokemon = ({pokemon, testid}) => {
    const isPokemonDead = pokemon.currentPv === 0
    return (
        <article className={`pokemon ${isPokemonDead ? 'pokemon--dead' : ''}`} data-testid={testid}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.img} alt="" />

            <p>PV: {pokemon.currentPv} / {pokemon.totalPv}</p>
        </article>
    )
}