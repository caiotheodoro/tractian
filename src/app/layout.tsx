import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/templates/layout/layout";
import Providers from "@/providers/providers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CompanyContract from "@/api/company/contract/company";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await CompanyContract.getCompanies.execute();
      return response;
    },

    staleTime: 1000 * 60 * 10,
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Layout>{children}</Layout>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
