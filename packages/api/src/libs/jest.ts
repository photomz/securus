import { AppSyncResolverEvent } from 'aws-lambda';
import { v4 } from 'uuid';

export const uuid = (): string => `unit-${new Date()}-${v4().slice(0, 5)}`; // compound index with Date for Console debugging
export const format = <T>(args: T): AppSyncResolverEvent<T> => ({
  arguments: args,
  request: {
    headers: {},
  },
  info: {
    selectionSetList: [],
    selectionSetGraphQL: '',
    parentTypeName: '',
    fieldName: '',
    variables: {},
  },
  source: {},
  prev: { result: {} },
  stash: {},
});
