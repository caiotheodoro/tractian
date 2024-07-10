import CompanyGateway from "../gateways/company";
import {
  GetAssetsUseCase,
  GetCompaniesUseCase,
  GetLocationsUseCase
} from "@/api/company/use-cases";

const CompanyContract = {
  getCompanies: new GetCompaniesUseCase(CompanyGateway),
  getLocations: new GetLocationsUseCase(CompanyGateway),
  getAssets: new GetAssetsUseCase(CompanyGateway),
};

export default CompanyContract;
