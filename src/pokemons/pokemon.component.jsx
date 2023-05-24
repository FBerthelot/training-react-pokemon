import './pokemon.css'

export const Pokemon = ({pokemon, testid}) => {
    return (
        <article className="pokemon" data-testid={testid}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.img} alt="" />

            <p>PV: {pokemon.currentPv} / {pokemon.totalPv}</p>
        </article>
    )
}