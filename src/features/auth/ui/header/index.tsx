import styles from "./styles.module.css";
import logo from "../../../../shared/assets/images/logo.svg";

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo"></img>
      </div>
      <div className={styles.title}>
        <h1>Добро пожаловать!</h1>
        <span>Пожалуйста, авторизируйтесь</span>
      </div>
    </div>
  );
};
