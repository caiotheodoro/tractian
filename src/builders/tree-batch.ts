import { INodeTypeEnum, ISensorStatusEnum, ISensorTypeEnum } from "@/enums/tree";
import { IFilter } from "@/hooks/stores/useCompany";
import { IAsset, ILocation, ITree } from "@/types/gateways/company";
class TreeBatchBuilder {
  private locationMap: Map<string, ILocation>;
  private assetMap: Map<string, IAsset>;
  private filter: IFilter;
  private batchSize: number;
  private root: INode;
  private queue: Array<{ parentNode: INode, parentId: string | null }>;

  constructor(private data: ITree, filter: IFilter, batchSize: number = 50) {
    this.locationMap = new Map();
    this.assetMap = new Map();
    this.filter = filter;
    this.batchSize = batchSize;
    this.root = {
      id: "ROOT",
      name: "ROOT",
      type: "location",
      children: []
    };
    this.queue = [{ parentNode: this.root, parentId: null }];
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

  private addChildrenBatch(): void {
    const batch = this.queue.splice(0, this.batchSize);

    batch.forEach(({ parentNode, parentId }) => {
      this.data.locations
        .filter(location => location.parentId === parentId)
        .forEach(location => {
          const childNode = this.createTreeNode(location, INodeTypeEnum.Location);
          parentNode.children.push(childNode);
          this.queue.push({ parentNode: childNode, parentId: location.id });
        });

      this.data.assets
        .filter(asset => asset.locationId === parentId || asset.parentId === parentId)
        .forEach(asset => {
          const type: INodeType = asset.sensorType ? INodeTypeEnum.Component : INodeTypeEnum.Asset;
          const childNode = this.createTreeNode(asset, type);
          parentNode.children.push(childNode);
          this.queue.push({ parentNode: childNode, parentId: asset.id });
        });
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

  public buildNextBatch(): INode {
    this.addChildrenBatch();
    this.pruneDuplicateNodeIds(this.root, new Set());
    this.filterNodes(this.root, this.filter);
    return this.root;
  }

  public isComplete(): boolean {
    return this.queue.length === 0;
  }


  
}

export { TreeBatchBuilder };
