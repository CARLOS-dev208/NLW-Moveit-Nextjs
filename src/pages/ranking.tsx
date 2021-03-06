import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import styles from "../styles/pages/Ranking.module.css";
export default function Ranking() {
  return (
    <>
      <Head>
        {" "}
        <title>Ranking | move.it</title>
      </Head>
      <Sidebar active={"ranking"} />

      <div className={styles.conteiner}>
        <div className={styles.content}>
          <h3>Top 10 | Ranking</h3>

          <table >
            <thead>
              <tr>
                <th>Posição</th>
                <th>Usuário</th>
                <th>Desafios</th>
                <th>Experiência</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}
