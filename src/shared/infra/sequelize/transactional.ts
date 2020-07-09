import {models} from './models';

/**
 * Transactional
 *
 * @return {any}
 */
function transactional() {
  return (
      target: any,
      propertyKey: string,
      descriptor: TypedPropertyDescriptor<(...params: any[])=> Promise<any>>,
  ) => {
    const oldFunc = descriptor.value;
    descriptor.value = async function() {
      // create transaction and add to function arguments
      const transaction = await models.sequelize.transaction();
      const newArgs = [];
      newArgs.push(arguments[0]);
      newArgs.push(transaction);
      try {
        // evaluate method being decorated with new args
        const result = await oldFunc.apply(this, newArgs);
        // if function doesn't error commit the transaction
        await transaction.commit();
        // return the functions result to its caller
        return result;
      } catch (error) {
        // if the function errored rollback the transaction
        await transaction.rollback();
        // throw it's error to the caller
        throw error;
      }
    };
  };
}

module.exports = {transactional};
