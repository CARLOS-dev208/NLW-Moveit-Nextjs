import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";


type Challenge = {
  type: 'body' | 'eye';
  description: string;
  amount:number;
}

type ChallengesContextData = {
  level: number;
  currentExperience: number;
  challengesComplited: number;
  activeChallenge: Challenge;
  experinceToNextLevel:number
  levelup: () => void;
  startNewChallenges: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
};

type ChellengesProviderProps = {
  children: ReactNode;
};

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChellengesProvider({ children }: ChellengesProviderProps) {


  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesComplited, setChallengesComplited] = useState(0);
  const [activeChallenge,setActiveChallenge] = useState(null);

  
  const experinceToNextLevel = Math.pow((level + 1) * 4,2);

  useEffect(()=>{
    Notification.requestPermission();
  },[]);

  function levelup() {
    setLevel(level + 1);
  }

  function startNewChallenges() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === "granted"){
      new Notification('Novo desafio',{
        body:`valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function completeChallenge(){
      if(!activeChallenge){
        return;
      }

      const {amount} = activeChallenge;

      let finalExperience = currentExperience + amount;

      if(finalExperience >= experinceToNextLevel){
        finalExperience = finalExperience - experinceToNextLevel;
        levelup();

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesComplited(challengesComplited + 1);

      }
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challengesComplited,
      activeChallenge,
      experinceToNextLevel,
      levelup,
      startNewChallenges,
      resetChallenge,
      completeChallenge}}>
      {children}
    </ChallengesContext.Provider>
  );
}
