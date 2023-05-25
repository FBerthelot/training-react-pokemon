import { render } from "@testing-library/react"
import { PokemonSelectorScreen } from "./pokemonSelector.screen"
import { BrowserRouter } from "react-router-dom";


describe('pokemonSelector screen', () => {
    // There is no valuable test to make here, this component just display links...
    it('should not throw error', () => {
        render(<PokemonSelectorScreen />, {wrapper: BrowserRouter});
    })
})