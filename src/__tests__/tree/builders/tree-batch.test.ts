import { describe, it, expect, beforeEach } from 'vitest';
import { ITree } from '@/types/gateways/company';
import { IFilter } from '@/hooks/stores/useCompany';
import { TreeBatchBuilder } from '@/builders/tree-batch';
import { mediumTreeData } from '@/__mocks__/tree-data';

let treeData: ITree;
let filter: IFilter;

beforeEach(() => {


  filter = {
    name: '',
    sensorType: undefined,
    status: undefined
  };
});

describe('TreeBatchBuilder', () => {
  const batchSizes = [50, 100];

  it('should initialize maps correctly', () => {
    const builder = new TreeBatchBuilder(mediumTreeData as ITree, filter, 50);
    expect(builder['locationMap'].size).toBe(mediumTreeData.locations.length);
    expect(builder['assetMap'].size).toBe(mediumTreeData.assets.length);
  });


  batchSizes.forEach(batchSize => {
    it(`should process batches correctly with batch size ${batchSize}`, () => {
      const builder = new TreeBatchBuilder(mediumTreeData as ITree, filter, batchSize);
      let tree: INode | null = null;
      const treeSize = (mediumTreeData.assets.length + mediumTreeData.locations.length) * 2;
      let counter = 0;

      while (!builder.isComplete()) {
        counter++;
        tree = { ...builder.buildNextBatch() };
      }

      expect(counter).toBe(Math.ceil(treeSize / batchSize) + 1);
      expect(tree?.children.length).toBe(11);
      expect(builder.isComplete()).toBe(true);
    });
  });
});
