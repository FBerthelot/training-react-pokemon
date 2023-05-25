import { Pokemon } from "./pokemons/pokemon.component";
import { useBattle } from "./useBattle";

export const Arena = ({
    attacker,
    defender
}) => {
    const [battleState, togglePlayPause] = useBattle({
        name: attacker.name,
        img: attacker.sprites.back_default,
    }, {
        name: defender.name,
        img: defender.sprites.front_default,
    })

    return (
        <>
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
        </>
    );
}