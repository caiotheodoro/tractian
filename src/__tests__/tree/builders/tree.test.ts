import { describe, it, expect, beforeEach } from 'vitest';
import { ITree } from '@/types/gateways/company';
import { IFilter } from '@/hooks/stores/useCompany';
import { TreeBuilder } from '@/builders/tree';
import { largeTreeData, mediumTreeData, smallTreeData } from '@/__mocks__/tree-data';

let filter: IFilter;

beforeEach(() => {
  filter = {
    name: '',
    sensorType: undefined,
    status: undefined
  };
});

describe('TreeBuilder', () => {
  it('should initialize maps correctly', () => {
    const builder = new TreeBuilder(smallTreeData as ITree, filter);
    expect(builder['locationMap'].size).toBe(4);
    expect(builder['assetMap'].size).toBe(9);
  });

  it('should build a tree small structure', () => {
    const builder = new TreeBuilder(smallTreeData as ITree, filter);
    const tree = builder.buildTree();
    expect(tree.children.length).toBe(4);
  });


  it('should build a tree medium structure', () => {
    const builder = new TreeBuilder(mediumTreeData as ITree, filter);
    const tree = builder.buildTree();
    console.log(tree)
    expect(tree.children.length).toBe(11);
  });

  
  it('should build a tree large structure', () => {
    const builder = new TreeBuilder(largeTreeData as ITree, filter);
    const tree = builder.buildTree();
    console.log(tree)
    expect(tree.children.length).toBe(237);
  });

});
