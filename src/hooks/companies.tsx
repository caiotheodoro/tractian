import CompanyContract from "@/api/company/contract/company";
import { TreeBatchBuilder } from "@/builders/tree-batch";
import { useQuery } from "@tanstack/react-query";
import { IFilter } from "@/hooks/stores/useCompany";
import { useEffect, useState } from "react";
import { TreeBuilder } from "@/builders/tree";

const MIN_SIZE_TO_BATCH = 50;

export function useGetCompanies() {
  return useQuery({
    queryFn: async () => await CompanyContract.getCompanies.execute(),
    queryKey: ["companies"],
    staleTime: 1000 * 60 * 10,
  });
}

export function useGetAssetsAndLocations(companyId: string, filters: IFilter) {
  const [tree, setTree] = useState<INode | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const query = useQuery({
    queryFn: async () => {
      const assets = await CompanyContract.getAssets.execute(companyId);
      const locations = await CompanyContract.getLocations.execute(companyId);
      return { assets, locations };
    },
    queryKey: ["local-assets", companyId],
    staleTime: 1000 * 60 * 10,
  });

  const treeSize =
    (query?.data?.assets?.length ?? 0) + (query?.data?.locations?.length ?? 0);

  const shouldBatch = treeSize > MIN_SIZE_TO_BATCH;

  useEffect(() => {
    if (query.data) {
      const batchSize = 50;

      if (shouldBatch) {
        const builder = new TreeBatchBuilder(query.data, filters, batchSize);
        const buildTreeInBatches = () => {
          if (!builder.isComplete()) {
            const updatedTree = builder.buildNextBatch();
            setTree({ ...updatedTree });
            if (!builder.isComplete()) {
              setTimeout(buildTreeInBatches, 5);
            } else {
              setIsComplete(true);
            }
          }
        };

        buildTreeInBatches();
      } else {
        const builder = new TreeBuilder(query.data, filters);
        setTree(builder.buildTree());
        setIsComplete(true);
      }
    }
  }, [query.data, filters, shouldBatch]);

  return {
    treeSize,
    data: tree,
    isComplete,
    isLoading: query.isFetching,
  };
}
