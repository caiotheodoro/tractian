import React from "react";
import styles from "./info-block.module.css";

export const InfoBlock: React.FC<ComponentProps> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
