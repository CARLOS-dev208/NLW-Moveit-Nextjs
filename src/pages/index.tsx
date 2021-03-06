import { GetServerSideProps } from "next";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import styles from "../styles/pages/home.module.css";
import Head from "next/head";
import { ChellengesProvider } from "../contexts/ChellengesContext";
import Cookies from "js-cookie";
import { Sidebar } from "../components/Sidebar";

type HomeProps = {
  level: number;
  currentExperience: number;
  challengesComplited: number;
};

export default function Home(props: HomeProps) {
  const user_id = Cookies.get("user_id");
  const user_access_token = Cookies.get("user_access_token");

  return (
    <ChellengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesComplited={props.challengesComplited}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        {user_id && user_access_token && (
          <>
            <ExperienceBar />
                <Sidebar active="home"/>
            <CountdownProvider>
              <section>
                <div>
                  <Profile />
                  <CompletedChallenges />
                  <Countdown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>
          </>
        )}
      </div>
    </ChellengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesComplited } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesComplited: Number(challengesComplited),
    },
  };
};
