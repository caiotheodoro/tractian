import {ICompanyGateway, ILocation } from "@/types/gateways/company";


class GetLocationsUseCase {
  constructor (private gateway: ICompanyGateway) {}

  async execute (companyId:string): Promise<ILocation[]> {
    try {
      const response = await this.gateway.getLocations(companyId);
     
      return response

    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw err;
    }
  }
}

export default GetLocationsUseCase;
