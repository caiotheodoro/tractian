import React, {
  createElement,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import styles from "@/components/organisms/tree/node/node.module.css";
import useCompanyStore from "@/hooks/stores/useCompany";
import ArrowIcon from "@/components/atoms/icon/arrow";
import { IAsset } from "@/types/gateways/company";
import { INodeTypeEnum } from "@/enums/tree";
import NodeChildren from "@/components/organisms/tree/node-children/node-children";
import { NodeIcon, SensorIcon, SensorStatusIcon } from "@/utils/node";

export interface ITreeViewItemProps extends INodeProps {
  isOpen?: boolean;
  children?: ReactNode;
}

const Node: React.FC<ITreeViewItemProps> = ({
  id,
  type,
  name,
  children,
  isOpen = false,
  sensorType,
  status,
  ...rest
}) => {
  const [opened, setOpened] = useState(isOpen);
  const { setAsset, asset } = useCompanyStore();

  const nodeIcon = useMemo(() => NodeIcon, []);
  const sensorIcon = useMemo(() => SensorIcon, []);
  const sensorStatusIcon = useMemo(() => SensorStatusIcon, []);

  const isTypeComponent = type === INodeTypeEnum.Component;
  const hasNodes = React.Children.count(children) > 0;
  const current = asset?.id === id;

  const handleOpen = useCallback(() => {
    if (isTypeComponent) {
      setAsset({ id, type, name, ...rest } as IAsset);
      return;
    }
    hasNodes && setOpened(!opened);
  }, [isTypeComponent, hasNodes, opened, setAsset, id, type, name, rest]);

  return (
    <div className={styles.node}>
      <button className={styles.button} onClick={handleOpen}>
        {hasNodes && <ArrowIcon isOpen={opened} />}
        <div className={`${styles.content} ${current && styles.active}`}>
          <div className={styles.icon}>{createElement(nodeIcon[type])}</div>
          <p className={styles.item} title={name}>
            {name}
            <span>
              {sensorType &&
                createElement(sensorIcon[sensorType], {
                  width: 12,
                  height: 12,
                })}
            </span>
            {status && createElement(sensorStatusIcon[status])}
          </p>
        </div>
      </button>
      {opened && (
        <NodeChildren hasLine={isTypeComponent}>{children}</NodeChildren>
      )}
    </div>
  );
};

export default Node;
