import { Component, ReactNode } from "react";
import { IFooterProps, IFooterStates } from "./footer.constants";
import styles from "./footer.module.scss";

class Footer extends Component<IFooterProps, IFooterStates> {
  render(): ReactNode {
    return (
      <div className={styles.footer}>
        <div className={styles.rights}>
          © 2024 All Rights Reserved. Designed & Developed by Chavi Mathur.
        </div>
      </div>
    );
  }
}

export default Footer;
