import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";
import { useRouter } from "next/router";
import axios from "axios";

type Challenge = {
  type: "body" | "eye";
  description: string;
  amount: number;
};

type ChallengesContextData = {
  level: number;
  currentExperience: number;
  challengesComplited: number;
  activeChallenge: Challenge;
  experinceToNextLevel: number;
  levelup: () => void;
  startNewChallenges: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
};

type ChellengesProviderProps = {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesComplited: number;
};

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChellengesProvider({
  children,
  ...rest
}: ChellengesProviderProps) {
  const Router = useRouter();
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesComplited, setChallengesComplited] = useState(
    rest.challengesComplited ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModal, setisLevelUpModal] = useState(false);

  const experinceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();

    const user_id = Cookies.get("user_id");
    const user_access_token = Cookies.get("user_access_token");
    if (!user_id || !user_access_token) {
      Router.push("/auth");
    }
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesComplited", String(challengesComplited));

    const user_avatar = Cookies.get("user_avatar");
    const user_name = Cookies.get("user_name");
    const user_login = Cookies.get("user_login");
    const user_id = Cookies.get("user_id");

    axios.post("/api/challenge-save-data", {
      user_avatar,
      user_name,
      user_login,
      user_id,
      level,
      currentExperience,
      challengesComplited,
    });
  }, [level, currentExperience, challengesComplited]);

  function levelup() {
    setLevel(level + 1);
    setisLevelUpModal(true);
  }

  function closeLevelUpModal() {
    setisLevelUpModal(false);
  }

  function startNewChallenges() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio", {
        body: `valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experinceToNextLevel) {
      finalExperience = finalExperience - experinceToNextLevel;
      levelup();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesComplited(challengesComplited + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesComplited,
        activeChallenge,
        experinceToNextLevel,
        levelup,
        startNewChallenges,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModal && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
