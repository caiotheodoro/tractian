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

const Tree = () => {
  const router = useParams<PageParams>();
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

  const [renderedItems, setRenderedItems] = useState<React.ReactNode[]>([]);

  const debouncedRenderNodes = useMemo(
    () =>
      debounce((items: INode[]) => {
        setRenderedItems(renderNodes(items));
      }, 30),
    [renderNodes]
  );

  useEffect(() => {
    if (data?.children) {
      debouncedRenderNodes(data.children);
    }
    return () => {
      debouncedRenderNodes.cancel();
    };
  }, [data?.children, debouncedRenderNodes]);

  const hasData = (data?.children?.length ?? 0) > 0;

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
            onChange={(e) => setFilter({ name: e.target.value })}
            value={filter.name}
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
