import { IAsset } from "@/types/gateways/company";
import { create } from "zustand";


export interface IFilter {
  name?: string;
  sensorType?: boolean;
  status?: boolean;
}
interface PersistState {
  asset: IAsset
  setAsset: (data: IAsset) => void

  filter: IFilter
  setFilter: (data: Partial<IFilter>) => void
}


const useCompanyStore = create<PersistState>()((set) => ({
    asset: {} as IAsset,
    setAsset: (data: IAsset) => set({ asset: data }),

    filter: {} as IFilter,
    setFilter: (data: Partial<IFilter>) => set({ filter: { 
      ...useCompanyStore.getState().filter,
      ...data,
     } }),
  })
);

export default useCompanyStore;