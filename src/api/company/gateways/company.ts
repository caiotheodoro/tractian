import { IAsset, ICompany, ICompanyGateway, ILocation } from "@/types/gateways/company";
import { getInstance } from "@/api/instance";


const CompanyGateway: ICompanyGateway = {
  getCompanies: async (): Promise<ICompany[]> => {
    const instance = getInstance();
    const { data } = await instance.get('/companies');

    return data;
  },
  getLocations: async (companyId: string): Promise<ILocation[]> => {
    const instance = getInstance();
    const { data } = await instance.get(`/companies/${companyId}/locations`);

    return data;
  },
  getAssets: async (companyId: string): Promise<IAsset[]> => {
    const instance = getInstance();
    const { data } = await instance.get(`/companies/${companyId}/assets`);

    return data;
  },
}

export default CompanyGateway;