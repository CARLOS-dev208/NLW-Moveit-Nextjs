import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div  className={styles.profileConteiner}>
      <img
        src="https://github.com/CARLOS-dev208.png"
        alt="Carlos" 
      />
      <div>
        <strong>Carlos Eduardo</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
          </p>
      </div>
    </div>
  );
}
