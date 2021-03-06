import styles from "../styles/components/Sidebar.module.css";
import { useRouter } from "next/router";
export function Sidebar({ active }) {
  const route = useRouter();

  function mudarRotaHomeOrRanking(){
    if(active === 'home'){
    route.push("/ranking");

    }else if(active === 'ranking'){
    route.push("/");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <img src="LogoSidebar.svg" alt="logo" />

          <nav className={styles.rotas}>
            <ul>
              {active === "home" ? (
                <li >
                  <img src="/icons/home-blue.svg" alt="Home" />
                </li>
              ) : (
                <li onClick={mudarRotaHomeOrRanking}>
                  <img src="/icons/home.svg" alt="Home" />
                </li>
              )}
              {active === "ranking" ? (
                <li >
                  <img src="/icons/best-blue.svg" alt="ranking" />
                </li>
              ) : (
                <li onClick={mudarRotaHomeOrRanking}>
                  <img src="/icons/best.svg" alt="ranking" />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
