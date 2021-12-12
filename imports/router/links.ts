import Debug from 'debug';

import { generateApolloClient } from '@deep-foundation/hasura/client';
import { HasuraApi } from "@deep-foundation/hasura/api";
import { sql } from '@deep-foundation/hasura/sql';
import { gql } from 'apollo-boost';
import vm from 'vm';

import { permissions } from '../permission';
import { reject, resolve } from '../promise';
import { DeepClient } from '../client';
import { ALLOWED_IDS, DENIED_IDS } from '../global-ids';

const SCHEMA = 'public';

const debug = Debug('deepcase:eh');

export const api = new HasuraApi({
  path: process.env.MIGRATIONS_HASURA_PATH,
  ssl: !!+process.env.MIGRATIONS_HASURA_SSL,
  secret: process.env.MIGRATIONS_HASURA_SECRET,
});

const client = generateApolloClient({
  path: `${process.env.MIGRATIONS_HASURA_PATH}/v1/graphql`,
  ssl: !!+process.env.MIGRATIONS_HASURA_SSL,
  secret: process.env.MIGRATIONS_HASURA_SECRET,
});

const deep = new DeepClient({
  apolloClient: client,
})

export default async (req, res) => {
  try {
    const event = req?.body?.event;
    const operation = event?.op;
    if (operation === 'INSERT' || operation === 'UPDATE' || operation === 'DELETE') {
      const oldRow = event?.data?.old;
      const newRow = event?.data?.new;
      const current = operation === 'DELETE' ? oldRow : newRow;
      const typeId = current.type_id;
      console.log('current', current, typeId);

      try {
        // type |== type: handle ==> INSERT symbol (ONLY)
        // const handleStringResult = await client.query({ query: gql`query SELECT_STRING_HANDLE($typeId: bigint) { string(where: {
        //   link: {
        //     type_id: { _eq: 20 },
        //     to_id: { _eq: 16 },
        //     from_id: { _eq: $typeId }
        //   },
        // }) {
        //   id
        //   value
        // } }`, variables: {
        //   typeId,
        // }});
        // const handleStringValue = handleStringResult?.data?.string?.[0]?.value;
        // if (handleStringValue) {
        //   try { 
        //     vm.runInNewContext(handleStringValue, { console, Error, oldRow, newRow });
        //   } catch(error) {
        //     debug(error);
        //   }
        // }

        const queryString = `query SELECT_CODE($typeId: bigint) { links(where: {
          type_id: { _eq: ${await deep.id('@deep-foundation/core', 'SyncTextFile')} },
          # to_id: { _eq: 16 },
          # from_id: { _eq:  }
          in: {
            from_id: { _eq: ${await deep.id('@deep-foundation/core', 'JSExecutionProvider')} },
            type_id: { _eq: ${await deep.id('@deep-foundation/core', 'Handler')} },
            in: {
              from: {
                type_id: { _eq: $typeId },
              },
              type_id: { _eq: ${await deep.id('@deep-foundation/core', 'InsertHandler')} },
            }
          }
        }) {
          id
          value
        } }`;
        console.log(queryString);

        const query = gql`query SELECT_CODE($typeId: bigint) { links(where: {
          type_id: { _eq: ${await deep.id('@deep-foundation/core', 'SyncTextFile')} },
          # to_id: { _eq: 16 },
          # from_id: { _eq:  }
          in: {
            from_id: { _eq: ${await deep.id('@deep-foundation/core', 'JSExecutionProvider')} },
            type_id: { _eq: ${await deep.id('@deep-foundation/core', 'Handler')} },
            in: {
              from: {
                type_id: { _eq: $typeId },
              },
              type_id: { _eq: ${await deep.id('@deep-foundation/core', 'HandleInsert')} },
            }
          }
        }) {
          id
          value
        } }`;
        console.log(query);
        // console.log(JSON.stringify(query, null, 2));

        const handleStringResult = await client.query({ query, variables: {
          typeId,
        }});
        
        // console.log(handleStringResult);
        // console.log(JSON.stringify(handleStringResult, null, 2));
        // console.log(handleStringResult?.data?.links?.[0]?.value);

        const promises: PromiseConstructor[] = [];

        const handlersWithCode = handleStringResult?.data?.links as any[];
        console.log(handlersWithCode?.length);
        if (handlersWithCode?.length > 0)
        {
          for (const handlerWithCode of handlersWithCode) {
            const code = handlerWithCode?.value?.value;
            if (code) {
              try {
                console.log("handler4: ");
                // vm.runInNewContext(code, { console, Error, oldRow, newRow });

                var vm = require('vm');
                const _module: any = { exports: {} };
                const delay = (time) => new Promise(res => setTimeout(() => res(null), time));
                console.log(`code: ${code}`);
                console.log('start');
                vm.runInNewContext(`
                  module.exports = { default: async () => {
                      ${code}
                  } };
                `, { module: _module, delay, console, Error, oldRow, newRow });
                
                console.log('end');
                // vm.runInNewContext(`export default 123;`, { module: _module });
                
                // const result = await _module.exports.default();
                // console.log(`result: ${result}`);

                promises.push(_module.exports.default());
              } catch(error) {
                debug('error', error);
              }
            }
          }
        }

        // promises.push();

        Promise.allSettled([...promises, Promise.reject(new Error('an error'))])
        // Promise.allSettled(promises)
        .then(values => {

          console.log(values);

        });

        if (operation === 'INSERT' && !DENIED_IDS.includes(current.type_id) && ALLOWED_IDS.includes(current.type_id)) {
          debug('resolve', current.id);
          await resolve({
            id: current.id, client,
            Then: await deep.id('@deep-foundation/core', 'Then'),
            Promise: await deep.id('@deep-foundation/core', 'Promise'),
            Resolved: await deep.id('@deep-foundation/core', 'Resolved'),
            Rejected: await deep.id('@deep-foundation/core', 'Rejected'),
          });
        }
        return res.status(200).json({});
      } catch(error) {
        debug('error', error);
        if (operation === 'INSERT' && !DENIED_IDS.includes(current.type_id) && ALLOWED_IDS.includes(current.type_id)) {
          debug('reject', current.id);
          await reject({
            id: current.id, client,
            Then: await deep.id('@deep-foundation/core', 'Then'),
            Promise: await deep.id('@deep-foundation/core', 'Promise'),
            Resolved: await deep.id('@deep-foundation/core', 'Resolved'),
            Rejected: await deep.id('@deep-foundation/core', 'Rejected'),
          });
        }
      }

      return res.status(500).json({ error: 'notexplained' });
    }
    return res.status(500).json({ error: 'operation can be only INSERT or UPDATE' });
  } catch(error) {
    return res.status(500).json({ error: error.toString() });
  }
};