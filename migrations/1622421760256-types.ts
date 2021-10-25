import { generateApolloClient } from '@deepcase/hasura/client';
import Debug from 'debug';
import { generateMutation, generateSerial, insertMutation } from '../imports/gql';
import { TABLE_NAME as LINKS_TABLE_NAME } from './1616701513782-links';
import times from 'lodash/times';
import { time } from 'console';
import { Packager } from '../imports/packager';

const debug = Debug('deepcase:deeplinks:migrations:types');

const client = generateApolloClient({
  path: `${process.env.MIGRATIONS_HASURA_PATH}/v1/graphql`,
  ssl: !!+process.env.MIGRATIONS_HASURA_SSL,
  secret: process.env.MIGRATIONS_HASURA_SECRET,
});

const corePckg = {
  version: "",
  links: [
    { id: 1, type_id: 1, from_id: 0, to_id: 0, value: { value: 'type' } },
    { id: 2, type_id: 1, from_id: 0, to_id: 0, value: { value: 'string' } },
    { id: 3, type_id: 1, from_id: 0, to_id: 0, value: { value: 'name' } },
    { id: 4, type_id: 1, from_id: 0, to_id: 0, value: { value: 'number' } },
    { id: 5, type_id: 1, from_id: 0, to_id: 0, value: { value: 'boolean' } },
    { id: 6, type_id: 1, from_id: 0, to_id: 0, value: { value: 'any' } },
    { id: 7, type_id: 1, from_id: 0, to_id: 0, value: { value: 'selector' } },
    { id: 8, type_id: 1, from_id: 7, to_id: 6, value: { value: 'selection' } },
    { id: 9, type_id: 1, from_id: 0, to_id: 0, value: { value: 'rule' } },
    { id: 10, type_id: 1, from_id: 9, to_id: 7, value: { value: 'rule-subject' } },
    { id: 11, type_id: 1, from_id: 9, to_id: 7, value: { value: 'rule-object' } },
    { id: 12, type_id: 1, from_id: 9, to_id: 7, value: { value: 'rule-action' } },
    { id: 13, type_id: 1, from_id: 6, to_id: 6, value: { value: 'contain' } },
    { id: 14, type_id: 1, from_id: 0, to_id: 0, value: { value: 'subject' } },
    { id: 15, type_id: 1, from_id: 0, to_id: 0, value: { value: 'select' } },
    { id: 16, type_id: 1, from_id: 0, to_id: 0, value: { value: 'insert' } },
    { id: 17, type_id: 1, from_id: 0, to_id: 0, value: { value: 'update' } },
    { id: 18, type_id: 1, from_id: 0, to_id: 0, value: { value: 'delete' } },
    { id: 19, type_id: 1, from_id: 0, to_id: 0, value: { value: 'allow' } },
    { id: 20, type_id: 1, from_id: 0, to_id: 0, value: { value: 'handle' } },
    { id: 21, type_id: 1, from_id: 0, to_id: 0, value: { value: 'tree' } },
    { id: 22, type_id: 1, from_id: 21, to_id: 1, value: { value: 'tree-include-down' } },
    { id: 23, type_id: 1, from_id: 21, to_id: 1, value: { value: 'tree-include-up' } },
    { id: 24, type_id: 1, from_id: 21, to_id: 1, value: { value: 'tree-include-node' } },
    { id: 25, type_id: 21, from_id: 0, to_id: 0, value: null },
    { id: 26, type_id: 22, from_id: 25, to_id: 6, value: null },
    { id: 27, type_id: 22, from_id: 25, to_id: 13, value: null },
    { id: 28, type_id: 22, from_id: 25, to_id: 14, value: null },
    { id: 29, type_id: 1, from_id: 0, to_id: 0, value: { value: 'table' } },
    { id: 30, type_id: 1, from_id: 29, to_id: 1, value: { value: 'column' } },
    { id: 31, type_id: 1, from_id: 29, to_id: 1, value: { value: 'value' } },
    { id: 32, type_id: 1, from_id: 0, to_id: 0, value: { value: 'package' } },
    { id: 33, type_id: 29, from_id: 0, to_id: 0, value: null },
    { id: 34, type_id: 30, from_id: 33, to_id: 2, value: null },
    { id: 35, type_id: 31, from_id: 33, to_id: 1, value: null },
    { id: 36, type_id: 32, from_id: 0, to_id: 0, value: null },
    { id: 37, type_id: 13, from_id: 36, to_id: 1, value: null },
    { id: 38, type_id: 13, from_id: 36, to_id: 2, value: null },
    { id: 39, type_id: 13, from_id: 36, to_id: 3, value: null },
    { id: 40, type_id: 13, from_id: 36, to_id: 4, value: null },
    { id: 41, type_id: 13, from_id: 36, to_id: 5, value: null },
    { id: 42, type_id: 13, from_id: 36, to_id: 6, value: null },
    { id: 43, type_id: 13, from_id: 36, to_id: 7, value: null },
    { id: 44, type_id: 13, from_id: 36, to_id: 8, value: null },
    { id: 45, type_id: 13, from_id: 36, to_id: 9, value: null },
    { id: 46, type_id: 13, from_id: 36, to_id: 10, value: null },
    { id: 47, type_id: 13, from_id: 36, to_id: 11, value: null },
    { id: 48, type_id: 13, from_id: 36, to_id: 12, value: null },
    { id: 49, type_id: 13, from_id: 36, to_id: 13, value: null },
    { id: 50, type_id: 13, from_id: 36, to_id: 14, value: null },
    { id: 51, type_id: 13, from_id: 36, to_id: 15, value: null },
    { id: 52, type_id: 13, from_id: 36, to_id: 16, value: null },
    { id: 53, type_id: 13, from_id: 36, to_id: 17, value: null },
    { id: 54, type_id: 13, from_id: 36, to_id: 18, value: null },
    { id: 55, type_id: 13, from_id: 36, to_id: 19, value: null },
    { id: 56, type_id: 13, from_id: 36, to_id: 20, value: null },
    { id: 57, type_id: 13, from_id: 36, to_id: 21, value: null },
    { id: 58, type_id: 13, from_id: 36, to_id: 22, value: null },
    { id: 59, type_id: 13, from_id: 36, to_id: 23, value: null },
    { id: 60, type_id: 13, from_id: 36, to_id: 24, value: null },
    { id: 61, type_id: 13, from_id: 36, to_id: 25, value: null },
    { id: 62, type_id: 13, from_id: 36, to_id: 26, value: null },
    { id: 63, type_id: 13, from_id: 36, to_id: 27, value: null },
    { id: 64, type_id: 13, from_id: 36, to_id: 28, value: null },
    { id: 65, type_id: 13, from_id: 36, to_id: 29, value: null },
    { id: 66, type_id: 13, from_id: 36, to_id: 30, value: null },
    { id: 67, type_id: 13, from_id: 36, to_id: 31, value: null },
    { id: 68, type_id: 13, from_id: 36, to_id: 32, value: null },
    { id: 69, type_id: 13, from_id: 36, to_id: 33, value: null },
    { id: 70, type_id: 13, from_id: 36, to_id: 34, value: null },
    { id: 71, type_id: 13, from_id: 36, to_id: 35, value: null },
  ],
  strict: true,
};

export const up = async () => {
  debug('up');
  const packager = new Packager(client);
  await packager.importPackage(corePckg);
  // const mutateResult = await client.mutate(generateSerial({
  //   actions: [
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 1,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 1, value: 'type' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 2,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 2, value: 'string' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 3,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 3, value: 'name' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 4,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 4, value: 'number' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 5,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 5, value: 'boolean' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 6,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 6, value: 'any' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 7,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 7, value: 'selector' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 8,*/ type_id: 1, from_id: 7, to_id: 6 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 8, value: 'selection' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 9,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 9, value: 'rule' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 10,*/ type_id: 1, from_id: 9, to_id: 7 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 10, value: 'rule-subject' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 11,*/ type_id: 1, from_id: 9, to_id: 7 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 11, value: 'rule-object' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 12,*/ type_id: 1, from_id: 9, to_id: 7 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 12, value: 'rule-action' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 13,*/ type_id: 1, from_id: 6, to_id: 6 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 13, value: 'contain' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 14,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 14, value: 'subject' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 15,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 15, value: 'select' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 16,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 16, value: 'insert' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 17,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 17, value: 'update' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 18,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 18, value: 'delete' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 19,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 19, value: 'allow' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 20,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 20, value: 'handle' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 21,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 21, value: 'tree' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 22,*/ type_id: 1, from_id: 21, to_id: 1 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 22, value: 'tree-include-down' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 23,*/ type_id: 1, from_id: 21, to_id: 1 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 23, value: 'tree-include-up' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 24,*/ type_id: 1, from_id: 21, to_id: 1 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 24, value: 'tree-include-node' }, }),
      
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 25,*/ type_id: 21, from_id: 0, to_id: 0 } }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 26,*/ type_id: 22, from_id: 25, to_id: 6 } }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 27,*/ type_id: 22, from_id: 25, to_id: 13 } }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 28,*/ type_id: 22, from_id: 25, to_id: 14 } }),

  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 29,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 29, value: 'table' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 30,*/ type_id: 1, from_id: 29, to_id: 1 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 30, value: 'column' }, }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 31,*/ type_id: 1, from_id: 29, to_id: 1 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 31, value: 'value' }, }),

  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 32,*/ type_id: 1, from_id: 0, to_id: 0 } }),
  //     insertMutation(STRING_TABLE_NAME, { objects: { link_id: 32, value: 'package' }, }),

  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 33,*/ type_id: 29, from_id: 0, to_id: 0 } }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 34,*/ type_id: 30, from_id: 33, to_id: 2 } }),
  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 35,*/ type_id: 31, from_id: 33, to_id: 1 } }),

  //     insertMutation(LINKS_TABLE_NAME, { objects: { /*id: packageId,*/ type_id: 32, from_id: 0, to_id: 0 } }),
  //     ...times(36-1, i => insertMutation(LINKS_TABLE_NAME, { objects: { type_id: 13, from_id: 36, to_id: i+1 } })),
  //   ],
  //   name: 'INSERT_TYPE_TYPE',
  // }));
};

export const down = async () => {
  debug('down');
  const mutateResult = await client.mutate(generateSerial({
    actions: [
      generateMutation({
        tableName: LINKS_TABLE_NAME, operation: 'delete',
        variables: { where: { id: { _in: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18] } } },
      }),
    ],
    name: 'DELETE_TYPE_TYPE'
  }));
};