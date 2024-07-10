"use client";

import React from "react";
import styles from "./header.module.css";
import LogoIcon from "@/components/atoms/icon/logo";
import Link from "next/link";
import Button from "@/components/atoms/button/button";
import GoldIcon from "@/components/atoms/icon/gold";
import { useParams, useRouter } from "next/navigation";
import { useGetCompanies } from "@/hooks/companies";
export default function Header() {
  const { data: companies } = useGetCompanies();
  const router = useRouter();
  const { company: currentCompany } = useParams<PageParams>();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/" className={styles.link} about="Logo">
          <LogoIcon />
        </Link>
      </div>
      <div className={styles.group}>
        {companies?.map((company) => (
          <Button
            icon={<GoldIcon />}
            key={company.id}
            type={"primary"}
            size="small"
            active={currentCompany === company.id}
            onClick={() => handleRedirect(company.id)}
          >
            <span>{company.name} Unit</span>
          </Button>
        ))}
      </div>
    </header>
  );
}
