import { createContext, ReactNode, useState } from "react";



type ChallengesContextData = {
  level: number;
  currentExperience: number;
  challengesComplited: number;
  levelup: () => void;
  startNewChallenges: () => void;
};
type ChellengesProviderProps = {
  children: ReactNode;
};

export const ChallengsContext = createContext({} as ChallengesContextData);

export function ChellengesProvider({ children }: ChellengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesComplited, setChallengesComplited] = useState(0);

  function levelup() {
    setLevel(level + 1);
  }

  function startNewChallenges() {
    console.log("new challenges");
  }

  return (
    <ChallengsContext.Provider value={{
      level,
      currentExperience,
      challengesComplited,
      levelup,
      startNewChallenges
    }}>{children}</ChallengsContext.Provider>
  );
}
