import './App.css'

export function App() {
  const attacker = {
    name: "pikachu",
    img: "http://pokemon.lux.frachet.berthelot.io/api/img/back/pikachu.gif",
    currentPv: 50,
    totalPv: 100
  };

  const defender = {
    name: "salamèche",
    img: "http://pokemon.lux.frachet.berthelot.io/api/img/charmander.gif",
    currentPv: 25,
    totalPv: 100
  };

  return (
      <main>
        <h1>Bataille de pokémon!</h1>
        <section>
          <h2>L'arène</h2>
          <div className="arena">
            <article className="pokemon">
              <h2>{attacker.name}</h2>
              <img src={attacker.img} alt="" />

              PV: {attacker.currentPv} / {attacker.totalPv}
            </article>

            <article className="pokemon">
              <h2>{defender.name}</h2>
              <img src={defender.img} alt="" />

              PV: {defender.currentPv} / {defender.totalPv}
            </article>
          </div>
        </section>
        <section>
            Battle is not started yet.
        </section>
      </main>
  );
}


