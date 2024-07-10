import React from "react";
import styles from "./image-dnd.module.css";
import InboxIcon from "../icon/inbox";
export default function ImageDnD() {
  return (
    <div className={styles.container}>
      <div className={styles.centered}>
        <InboxIcon />
        <p>Adicionar imagem do Ativo</p>
      </div>
    </div>
  );
}
