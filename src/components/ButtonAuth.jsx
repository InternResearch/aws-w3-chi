import styles from "./ButtonAuth.module.css";
function ButtonAuth(props) {
  return (
    <>
      <button className={styles.button}>{props.value}</button>
    </>
  );
}

export default ButtonAuth;