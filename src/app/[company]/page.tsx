import React from "react";
import styles from "@/app/[company]/page.module.css";
import Preview from "@/components/organisms/preview/preview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CompanyContract from "@/api/company/contract/company";
import Header from "@/components/molecules/company/header/header";
const Tree = React.lazy(() => import("@/components/organisms/tree/tree"));

export default async function Company({
  params: { company },
}: Readonly<DynamicProps>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["local-assets", company],
    queryFn: async () => {
      const assets = await CompanyContract.getAssets.execute(company);
      const locations = await CompanyContract.getLocations.execute(company);

      return { assets, locations };
    },
    staleTime: 1000 * 60 * 10,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.container}>
        <Header companyId={company} />
        <div className={styles.view}>
          <Tree />
          <Preview />
        </div>
      </div>
    </HydrationBoundary>
  );
}
