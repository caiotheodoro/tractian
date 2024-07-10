import React from "react";
import styles from "@/components/organisms/tree/node-children/node-children.module.css";
interface INodeChildrenProps extends ComponentProps {
  hasLine: boolean;
}
export default function NodeChildren({
  children,
  hasLine,
}: Readonly<INodeChildrenProps>) {
  return (
    <div className={styles.node}>
      <div className={styles.block}>
        {!hasLine && <div className={styles.line} />}
      </div>
      <div className={styles.list}>{children}</div>
    </div>
  );
}
