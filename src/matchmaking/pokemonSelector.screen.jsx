import { useForm } from "react-hook-form";
import classes from './pokemonSelector.module.css'
import { useNavigate } from "react-router-dom";

export const PokemonSelectorScreen = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()

    const pokemonList = [
        'charmander',
        'pikachu',
        'bulbasaur'
    ]
    
    const onSubmit = handleSubmit(({attacker, defender}) => {
        navigate(`/battle/${attacker}/${defender}`)
    })

    return <main>
        <h1>Selectionne le combat que tu veux voir</h1>

        <form className={classes.matchmaking_form} onSubmit={onSubmit}>

            <label>
                Attacker:
                <select {...register('attacker')}>
                    {pokemonList.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
            </label>


            <label>
                Defender:
                <select {...register('defender')}>
                    {pokemonList.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
            </label>

            <button className={classes.matchmaking_button}  type="submit">Fight!</button>

        </form>
    </main>
}