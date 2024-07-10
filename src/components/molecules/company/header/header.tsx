"use client";
import React from "react";
import styles from "./header.module.css";
import Button from "@/components/atoms/button/button";
import ThunderIcon from "@/components/atoms/icon/thunder";
import DangerIcon from "@/components/atoms/icon/danger";
import { useGetCompanies } from "@/hooks/companies";
import useCompanyStore from "@/hooks/stores/useCompany";

interface IHeaderProps {
  companyId: string;
}
export default function Header({ companyId }: Readonly<IHeaderProps>) {
  const { data: companies } = useGetCompanies();
  const { setFilter, filter } = useCompanyStore();

  const company = companies?.find((company) => company.id === companyId)?.name;

  return (
    <div className={styles.header}>
      <div className={styles.text}>
        Ativos <span>/ {company} Unit</span>
      </div>
      <div className={styles.buttons}>
        <Button
          type="ghost"
          size="medium"
          icon={<ThunderIcon />}
          active={filter.sensorType}
          onClick={() => setFilter({ sensorType: !filter.sensorType })}
        >
          <span>Sensor de Energia</span>
        </Button>
        <Button
          type="ghost"
          size="medium"
          icon={<DangerIcon />}
          active={filter.status}
          onClick={() => setFilter({ status: !filter.status })}
        >
          <span>Crítico</span>
        </Button>
      </div>
    </div>
  );
}
