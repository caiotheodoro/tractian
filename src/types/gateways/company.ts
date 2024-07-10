

export interface ICompany {
  id: string;
  name: string;
}

export interface ILocation {
  id: string;
  name: string;
  parentId?: string;
}

export type ITree = {
  locations: ILocation[];
  assets: IAsset[];
};


export interface IAsset {
  id: string;
  name: string;
  parentId?: string;
  sensorId?: string;
  sensorType?: ISensorType;
  status?: ISensorStatus;
  gatewayId?: string;
  locationId?: string;
}



export interface ICompanyGateway {
  getCompanies(): Promise<ICompany[]>;
  getLocations(companyId: string): Promise<ILocation[]>;
  getAssets(companyId: string): Promise<IAsset[]>;
}
