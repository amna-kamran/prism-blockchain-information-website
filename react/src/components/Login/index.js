import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Login.module.sass";

const Login = ({ className, content, linkText, linkUrl, children }) => {
  return (
    <div className={cn(className, styles.login)}>
      <div
        className={styles.col}
        style={{
          backgroundImage: "url(/images/content/bg-login.png)",
        }}
      >
        <Link className={styles.logo} to="/">
          <img src="/images/prism-logo-dark.svg" alt="Prism" />
          <img src="/images/prism-logo.svg" alt="Prism" />
        </Link>
      </div>
      <div className={styles.col}>
        <div className={styles.head}>
          <span>{content}</span>
          <Link className={styles.link} to={linkUrl}>
            {linkText}
          </Link>
        </div>
        <div className={styles.wrap}>{children}</div>
      </div>
    </div>
  );
};

export default Login;
