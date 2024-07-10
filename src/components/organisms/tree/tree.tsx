"use client";
import React, { memo, useMemo } from "react";
import styles from "@/components/organisms/tree/tree.module.css";
import SearchIcon from "@/components/atoms/icon/search";
import { useGetAssetsAndLocations } from "@/hooks/companies";
import { useParams } from "next/navigation";
import Node from "@/components/organisms/tree/node/node";
import useCompanyStore from "@/hooks/stores/useCompany";
import Empty from "@/components/atoms/empty/empty";

const Tree = () => {
  const router = useParams<PageParams>();
  const { filter, setFilter } = useCompanyStore();

  const { data, isLoading, isComplete } = useGetAssetsAndLocations(
    router.company,
    filter
  );

  const renderNodes = useMemo(
    () => (items: INode[]) => {
      return items.map((item) => (
        <Node key={item.id} isOpen={!!filter} {...item}>
          {item.children && renderNodes(item.children)}
        </Node>
      ));
    },
    [filter]
  );

  if (isLoading && !isComplete) return <>Loading...</>;

  const hasData = (data?.children?.length ?? 0) > 0;
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            placeholder="Buscar Ativo ou Local"
            onChange={(e) => setFilter({ name: e.target.value })}
            value={filter.name}
          />
          <SearchIcon />
        </div>
      </div>

      <div className={styles.content}>
        {hasData ? renderNodes(data?.children as INode[]) : <Empty />}
      </div>
    </section>
  );
};

export default memo(Tree);
