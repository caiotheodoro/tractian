

export interface ICompany {
  id: string;
  name: string;
}

export interface ILocation {
  id: string;
  name: string;
  parentId?: string | null;
}

export type ITree = {
  locations: ILocation[];
  assets: IAsset[];
};


export interface IAsset {
  id: string;
  name: string;
  parentId?: string | null;
  sensorId?: string | null;
  sensorType?: ISensorType | null;
  status?: ISensorStatus | null;
  gatewayId?: string | null;
  locationId?: string | null;
}



export interface ICompanyGateway {
  getCompanies(): Promise<ICompany[]>;
  getLocations(companyId: string): Promise<ILocation[]>;
  getAssets(companyId: string): Promise<IAsset[]>;
}
