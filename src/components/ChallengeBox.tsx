import { useContext } from "react";
import { ChallengsContext } from "../contexts/ChellengesContext";
import styles from "../styles/components/ChallengeBox.module.css";
export function ChallengeBox(){

  const {activeChallenge,resetChallenge} = useContext(ChallengsContext);



  return(
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
          <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount} xp</header>
            <main>
              <img src={`icons/${activeChallenge.type}.svg`}/>
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>

            <footer>
              <button onClick={resetChallenge} type="button" className={styles.challengeFailedButton}>Falhei</button>
              <button type="button" className={styles.challengeSucceedeButton}>Completei</button>
            </footer>
          </div>
      ):(
        <div className={styles.challengeNotActive}>
        <strong>Finalize um ciclo para receber um desafio</strong>
        <p>
          <img src="icons/level-up.svg" alt="Level Up"/>
          Complete-os e ganhe experiência e avance de leve.
        </p>
      </div>
      )}
    </div>
  );

}