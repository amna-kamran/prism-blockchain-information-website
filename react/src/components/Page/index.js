import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Remove withRouter
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";

const Page = ({ headerHide, children, footerHide, headerWide }) => {
  const { pathname } = useLocation(); // Use useLocation hook directly

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <div className={styles.page}>
      {!headerHide && <Header headerWide={headerWide} />}
      <div className={styles.inner}>{children}</div>
      {!footerHide && <Footer />}
    </div>
  );
};

export default Page; // No need for withRouter
