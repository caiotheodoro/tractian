import { ICompany, ICompanyGateway } from "@/types/gateways/company";


class GetCompaniesUseCase {
  constructor (private gateway: ICompanyGateway) {}

  async execute (): Promise<ICompany[]> {
    try {
      const response = await this.gateway.getCompanies();


      
      return response;

    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw err;
    }
  }
}

export default GetCompaniesUseCase;
