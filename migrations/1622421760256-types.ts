import { generateApolloClient } from '@deepcase/hasura/client';
import Debug from 'debug';
import { generateMutation, generateSerial, insertMutation } from '../imports/gql';
import { TABLE_NAME as LINKS_TABLE_NAME } from './1616701513782-links';
import { TABLE_NAME as STRING_TABLE_NAME } from './1616701513783-type-table-string';

const debug = Debug('deepcase:deeplinks:migrations:types');

const client = generateApolloClient({
  path: `${process.env.MIGRATIONS_HASURA_PATH}/v1/graphql`,
  ssl: !!+process.env.MIGRATIONS_HASURA_SSL,
  secret: process.env.MIGRATIONS_HASURA_SECRET,
});

export const up = async () => {
  debug('up');
  const mutateResult = await client.mutate(generateSerial({
    actions: [
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 1,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 1, value: 'type' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 2,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 2, value: 'string' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 3,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 3, value: 'name' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 4,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 4, value: 'number' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 5,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 5, value: 'boolean' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 6,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 6, value: 'any' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 7,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 7, value: 'selector' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 8,*/ type_id: 1, from_id: 7, to_id: 6 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 8, value: 'selection' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 9,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 9, value: 'rule' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 10,*/ type_id: 1, from_id: 9, to_id: 7 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 10, value: 'rule_subject' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 11,*/ type_id: 1, from_id: 9, to_id: 7 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 11, value: 'rule_object' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 12,*/ type_id: 1, from_id: 9, to_id: 7 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 12, value: 'rule_action' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 13,*/ type_id: 1, from_id: 6, to_id: 6 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 13, value: 'contain' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 14,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 14, value: 'subject' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 15,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 15, value: 'select' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 16,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 16, value: 'insert' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 17,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 17, value: 'update' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 18,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 18, value: 'delete' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 19,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 19, value: 'allow' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 20,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 20, value: 'handle' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 21,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 21, value: 'mp_group' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 22,*/ type_id: 1, from_id: 21, to_id: 1 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 22, value: 'mp_include' }, }),
      
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 23,*/ type_id: 21, from_id: 0, to_id: 0 } }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 24,*/ type_id: 22, from_id: 23, to_id: 6 } }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 25,*/ type_id: 22, from_id: 23, to_id: 13 } }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 26,*/ type_id: 22, from_id: 23, to_id: 14 } }),

      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 27,*/ type_id: 6, from_id: 0, to_id: 0 } }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 28,*/ type_id: 6, from_id: 0, to_id: 0 } }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 29,*/ type_id: 6, from_id: 0, to_id: 0 } }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 30,*/ type_id: 6, from_id: 0, to_id: 0 } }),

      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 31,*/ type_id: 1, from_id: 0, to_id: 0 } }),
      insertMutation(STRING_TABLE_NAME, { objects: { link_id: 31, value: 'package' }, }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 32,*/ type_id: 21, from_id: 0, to_id: 0 } }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 33,*/ type_id: 22, from_id: 32, to_id: 31 } }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 34,*/ type_id: 22, from_id: 32, to_id: 13 } }),
      insertMutation(LINKS_TABLE_NAME, { objects: { /*id: 35,*/ type_id: 22, from_id: 32, to_id: 1 } }),
    ],
    name: 'INSERT_TYPE_TYPE',
  }));
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