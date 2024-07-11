"use client";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/components/organisms/tree/tree.module.css";
import SearchIcon from "@/components/atoms/icon/search";
import { useGetAssetsAndLocations } from "@/hooks/companies";
import { useParams } from "next/navigation";
import Node from "@/components/organisms/tree/node/node";
import useCompanyStore from "@/hooks/stores/useCompany";
import Empty from "@/components/atoms/empty/empty";
import { debounce } from "lodash";
import Skeleton from "@/components/atoms/skeleton/skeleton";
import { useDebouncedRenderNodes } from "@/hooks/tree";

const Tree = () => {
  const router = useParams<PageParams>();
  const [localFilter, setLocalFilter] = useState<string>("");
  const { filter, setFilter } = useCompanyStore();

  const { data, isLoading, isComplete } = useGetAssetsAndLocations(
    router.company,
    filter
  );

  const renderNodes = useCallback(
    (items: INode[]) => {
      return items.map((item) => (
        <Node key={item.id} isOpen={!!filter} {...item}>
          {item.children && renderNodes(item.children)}
        </Node>
      ));
    },
    [filter]
  );

  const renderedItems = useDebouncedRenderNodes(
    renderNodes,
    data?.children || []
  );

  const hasData = (data?.children?.length ?? 0) > 0;

  const debouncedSetFilter = useMemo(
    () => debounce((value: string) => setFilter({ name: value }), 900),
    [setFilter]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilter(e.target.value);
    debouncedSetFilter(e.target.value);
  };

  if (isLoading || !isComplete)
    return (
      <section className={styles.container}>
        <Skeleton />
      </section>
    );
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            placeholder="Buscar Ativo ou Local"
            onChange={handleInputChange}
            value={localFilter}
          />
          <SearchIcon />
        </div>
      </div>

      <div className={styles.content}>
        {hasData ? renderedItems : <Empty />}
      </div>
    </section>
  );
};

export default memo(Tree);
