import styles from "./styles.module.css";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      Нет аккаунта?{" "}
      <a href={"https://test.ru"} onClick={(e) => e.preventDefault()}>
        Создать
      </a>
    </div>
  );
};
