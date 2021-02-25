import { createContext, ReactNode, useState } from "react";
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
};

type ChellengesProviderProps = {
  children: ReactNode;
};

export const ChallengsContext = createContext({} as ChallengesContextData);

export function ChellengesProvider({ children }: ChellengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesComplited, setChallengesComplited] = useState(0);

  const [activeChallenge,setActiveChallenge] = useState(null);

  const experinceToNextLevel = Math.pow((level + 1) * 4,2);

  function levelup() {
    setLevel(level + 1);
  }

  function startNewChallenges() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  return (
    <ChallengsContext.Provider value={{
      level,
      currentExperience,
      challengesComplited,
      activeChallenge,
      experinceToNextLevel,
      levelup,
      startNewChallenges,
      resetChallenge}}>
      {children}
    </ChallengsContext.Provider>
  );
}
