import styles from "../styles/pages/auth.module.css";
import Head from "next/head";
import { useState } from "react";


export default function Auth() {
  const [login, setLogin] = useState('');

  function toQuery(params, delimiter = '&') {
    const keys = Object.keys(params);    
    return keys.reduce((str, key, index) => {
      let query = `${str}${key}=${params[key]}`;
        
      if (index < (keys.length - 1)) {
        query += delimiter;
      }
        
      return query;
    }, '');
  }

  function loginSigninIn(){
      const search = toQuery({
      client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
      login: login,
      })
      
    const url = `https://github.com/login/oauth/authorize?${search}`
    window.location.href = url
  }

  return (
    <>
      <Head>
        <title>Move.it - Faça Login</title>
      </Head>
      <div className={styles.container}>
        <img src="icons/logo-translucide.svg" />

        <div className={styles.loginContent}>
          <img src="./logos-full.svg" alt="Logo" />
          <strong>Bem vindo</strong>

          <div>
            <img src="./github.svg" alt="github"/>
            <p>Faça login com seu Github<br/>para começar</p>
          </div>

          <div className={styles.divInput}>
            <input 
              type="text" 
              placeholder="Digite seu username"
              value={login}
              onChange={(evt) => setLogin(evt.target.value) } 
              />
            { login.length >= 3 ? (
                <button onClick={loginSigninIn} className={styles.activeButton} >
                  <img src="./Vector.svg" alt="logor"/>
                </button>
              ) : (<button disabled >
                <img src="./Vector.svg" alt="logor"/>
              </button>) }
            
          </div>
        </div>
      </div>
    </>
  );
}
