import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Hello!</h1>
      <p>Welcome to the Rhoam Trading Systems app..!</p>
      <p>Here you can back-test and forward-test an automated trading system.</p>
    </div>
  );
}
