import styles from "./Input.module.css";

function Input(props) {
  return (
    <div>
      <label htmlFor={props.label}>
        <div>
          <input
            className={
              props.error ? `${styles.input} ${styles.error}` : styles.input
            }
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            name={props.name}
            id={props.label}
          />
          <span className={styles["input-border"]}></span>
        </div>
        <span className={styles["input-label"]}>{props.label}</span>
      </label>
    </div>
  );
}

export default Input;