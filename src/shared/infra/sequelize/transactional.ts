import {models} from './models';
import {AsyncLocalStorage} from 'async_hooks';
import {log} from '../../utils/log';

const asyncLocalStorage = new AsyncLocalStorage();

/**
 * Transactional
 *
 * @return {any}
 */
function transactional() {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(...params: any[])=> Promise<any>>) => {
    const func = descriptor.value;
    descriptor.value = async function() {
      // create transaction
      const transaction = await models.sequelize.transaction();
      console.log('transaction created');
      // create store with transaction
      const store = {t: transaction};
      // create async context with transaction in store
      asyncLocalStorage.run(store, async () => {
        try {
          // call method being decorated
          const retValue = await func.apply(this);
          // if there were no errors commit the transaction
          await transaction.commit();
          console.log('transaction committed');
          return retValue;
        } catch (err) {
          // if there were any errors rollback the transaction
          await transaction.rollback();
          throw err;
        }
      });
    };
  };
}