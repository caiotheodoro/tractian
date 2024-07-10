"use client";
import React from "react";
import styles from "./preview.module.css";
import useCompanyStore from "@/hooks/stores/useCompany";
import { InfoBlock } from "@/components/atoms/preview/info-block/info-block";
import VibrationIcon from "@/components/atoms/icon/vibration";
import ReceiverIcon from "@/components/atoms/icon/receiver";
import ImageDnD from "@/components/atoms/image-dnd/image-dnd";

const Preview = () => {
  const { asset } = useCompanyStore();
  return (
    <section className={styles.preview}>
      <header className={styles.header}>
        <h3>{asset?.name ?? "-"}</h3>
      </header>
      <div className={styles.content}>
        <div className={styles.container}>
          <ImageDnD />

          <div className={styles.info}>
            <InfoBlock>
              <h4>Tipo de Equipamento</h4>
              <p>-</p>
            </InfoBlock>
            <div className={styles.divider} />
            <InfoBlock>
              <h4>Responsáveis</h4>
              <p>-</p>
            </InfoBlock>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.footer}>
          <InfoBlock>
            <h4>Sensor</h4>
            <p>
              <VibrationIcon /> {asset?.sensorId ?? "-"}
            </p>
          </InfoBlock>
          <InfoBlock>
            <h4>Receptor</h4>
            <p>
              <ReceiverIcon /> {asset.gatewayId ?? "-"}
            </p>
          </InfoBlock>
        </div>
      </div>
    </section>
  );
};

export default Preview;
