import { useEffect, useState } from "react"

export const useBattle = (
    attackerInfos,
    defenderInfos
  ) => {
    const [battleState, setBattleState] = useState({
      attacker: {
        ...attackerInfos,
        currentPv: 100,
        totalPv: 100
      },
      defender: {
        ...defenderInfos,
        currentPv: 100,
        totalPv: 100
      },
      nextToAttack: 'attacker',
      winner: null,
      isPaused: true,
      logs: []
    })
  
    useEffect(() => {
      const interval = setInterval(() => {
        setBattleState((currentBattleState) => {
          if(currentBattleState.isPaused) {
            return currentBattleState;
          } 
  
          if(currentBattleState.winner) {
            clearInterval(interval);
            return {
              ...currentBattleState,
              logs: [
                ...currentBattleState.logs,
                {
                  id: currentBattleState.logs.length,
                  message: `${currentBattleState[currentBattleState.winner].name} won.`
                }
              ]
            };
          }
  
          const pokemonWhoLoseHpThisRound = currentBattleState.nextToAttack === 'attacker' ? 'defender': 'attacker'
  
          const newPv =  Math.max(currentBattleState[pokemonWhoLoseHpThisRound].currentPv - 10, 0);
          return {
            ...currentBattleState,
            [pokemonWhoLoseHpThisRound]: {
              ...currentBattleState[pokemonWhoLoseHpThisRound],
              currentPv: newPv
            },
            nextToAttack: pokemonWhoLoseHpThisRound,
            winner: newPv === 0 ? currentBattleState.nextToAttack : null,
            logs: [
              ...currentBattleState.logs,
              {
                id: currentBattleState.logs.length,
                message: `${currentBattleState[currentBattleState.nextToAttack].name} attack and ${currentBattleState[pokemonWhoLoseHpThisRound].name} loosed 10HP.`
              }
            ]
          }
        })
      }, 1000)
  
      return () => {
        clearInterval(interval)
      };
    }, [])
  
    const togglePlayPause = () => {
      setBattleState((battleState) => ({
        ...battleState,
        isPaused: !battleState.isPaused
      }))
    }
  
    return [battleState, togglePlayPause]
  }
  