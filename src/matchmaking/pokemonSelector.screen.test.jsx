import { render, screen } from "@testing-library/react"
import { PokemonSelectorScreen } from "./pokemonSelector.screen"
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {navigateMock} from 'react-router-dom'

jest.mock('react-router-dom', () => {
    const navigateMock = jest.fn()
    return {
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => navigateMock,
        navigateMock
    }
});



describe('pokemonSelector screen', () => {
    // There is no valuable test to make here, this component just display links...
    it('should navigate to the battle between pika and sala page when select pika and sala and submit the form', async () => {
        render(<PokemonSelectorScreen />, {wrapper: BrowserRouter});

        const user = userEvent.setup()

        await user.selectOptions(screen.getByLabelText(/Attacker/), 'pikachu')
        await user.selectOptions(screen.getByLabelText(/Defender/), 'charmander')

        await user.click(screen.getByRole('button'))

        expect(navigateMock).toHaveBeenCalledWith('/battle/pikachu/charmander')
    })

    it('should navigate to the battle between bulbi and pika page when select bulbi and pika and submit the form', async () => {
        render(<PokemonSelectorScreen />, {wrapper: BrowserRouter});

        const user = userEvent.setup()

        await user.selectOptions(screen.getByLabelText(/Attacker/), 'bulbasaur')
        await user.selectOptions(screen.getByLabelText(/Defender/), 'pikachu')

        await user.click(screen.getByRole('button'))

        expect(navigateMock).toHaveBeenCalledWith('/battle/bulbasaur/pikachu')
    })
})