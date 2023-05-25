import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PokemonSelectorScreen } from "./matchmaking/pokemonSelector.screen";
import { BattleScreen } from "./arena/battle.screen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonSelectorScreen/>,
  },
  {
    path: '/battle/:attacker/:defender',
    element: <BattleScreen />
  }
]);

export function App() {
  return <RouterProvider router={router}></RouterProvider>;
}


