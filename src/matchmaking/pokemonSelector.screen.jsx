import { Link } from "react-router-dom"

export const PokemonSelectorScreen = () => {
    return <main>
        <h1>Selectionne le combat que tu veux voir</h1>

        <ul>
            <li><Link to="/battle/pikachu/charmander">Pikachu Vs Salamèche</Link></li>
            <li><Link to="/battle/charmander/pikachu">Salamèche Vs Pikachu</Link></li>
            <li><Link to="/battle/pikachu/bulbasaur">Pikachu Vs Bulbizzare</Link></li>
        </ul>
    </main>
}