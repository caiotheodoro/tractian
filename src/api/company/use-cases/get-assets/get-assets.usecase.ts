import { IAsset, ICompanyGateway } from "@/types/gateways/company";


class GetAssetsUseCase {
  constructor (private gateway: ICompanyGateway) {}

  async execute (companyId:string): Promise<IAsset[]> {
    try {
      const response = await this.gateway.getAssets(companyId);
     
      return response;

    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw err;
    }
  }
}

export default GetAssetsUseCase;
