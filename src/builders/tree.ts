import { INodeTypeEnum, ISensorStatusEnum, ISensorTypeEnum } from "@/enums/tree";
import { IFilter } from "@/hooks/stores/useCompany";
import { IAsset, ILocation, ITree } from "@/types/gateways/company";



class TreeBuilder {
  private locationMap: Map<string, ILocation>;
  private assetMap: Map<string, IAsset>;
  private filter: IFilter;

  constructor(private data: ITree, filter: IFilter) {
    this.locationMap = new Map();
    this.assetMap = new Map();
    this.filter = filter;
    this.initializeMaps();
  }

  private initializeMaps(): void {
    this.data.locations.forEach(location => this.locationMap.set(location.id, location));
    this.data.assets.forEach(asset => this.assetMap.set(asset.id, asset));
  }

  private createTreeNode(data: ILocation | IAsset, type: INodeType): INode {
    return {
      ...data,
      type,
      children: []
    };
  }

  private addChildren(parentNode: INode, parentId: string | null): void {
    this.data.locations
      .filter(location => location.parentId === parentId)
      .forEach(location => {
        const childNode = this.createTreeNode(location, "location");
        parentNode.children.push(childNode);
        this.addChildren(childNode, location.id);
      });

    this.data.assets
      .filter(asset => asset.locationId === parentId || asset.parentId === parentId)
      .forEach(asset => {
        const type: INodeType = asset.sensorType ? "component" : "asset";
        const childNode = this.createTreeNode(asset, type);
        parentNode.children.push(childNode);
        this.addChildren(childNode, asset.id);
      });
  }

  private pruneDuplicateNodeIds(node: INode, ids: Set<string>): void {
    node.children = node.children.filter(child => {
      if (ids.has(child.id)) {
        return false;
      } else {
        ids.add(child.id);
        this.pruneDuplicateNodeIds(child, ids);
        return true;
      }
    });
  }

  private filterNodes(node: INode, filter: IFilter): boolean {
    let filterStatus = true;
    const name = filter?.name?.toLowerCase();
    const isTypeEnergy = node.sensorType !== ISensorTypeEnum.Energy
    const isTypeComponent = node.type === INodeTypeEnum.Component
    const isTypeAlert = node.status !== ISensorStatusEnum.Alert

    if (name && !node.name.toLowerCase().includes(name)) {
      filterStatus = false;
    }

    if (filter.sensorType && isTypeComponent && isTypeEnergy) {
      filterStatus = false;
    }

    if (filter.status && isTypeAlert) {
      filterStatus = false;
    }

    if (node.children.length > 0) {
      node.children = node.children.filter(child => this.filterNodes(child, filter));
      if (node.children.length > 0) {
        filterStatus = true;
      }
    }

    return filterStatus;
  }

  public buildTree(): INode {
    const root: INode = {
      id: "ROOT",
      name: "ROOT",
      type: "location",
      children: []
    };

    this.addChildren(root, null);
    this.pruneDuplicateNodeIds(root, new Set());
    this.filterNodes(root, this.filter);
    return root;
  }
}

export { TreeBuilder };
