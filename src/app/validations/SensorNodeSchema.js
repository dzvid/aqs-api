import * as Yup from 'yup';

import isUUID from 'validator/lib/isUUID';

const hasOnlySpaces = str => !str.trim().length;
const isEmpty = str => !str;

const SensorNodeSchema = {
  store: {
    body: Yup.object().shape({
      board_model: Yup.string()
        .typeError('Value must be a string')
        .required()
        .test(
          'is-empty',
          'Value cant be empty',
          value => !isEmpty(value) && !hasOnlySpaces(value)
        ),
      serial_number: Yup.string()
        .typeError('Value must be a string')
        .required()
        .test(
          'is-empty',
          'Value cant be empty',
          value => !isEmpty(value) && !hasOnlySpaces(value)
        ),
      description: Yup.string()
        .typeError('Value must be a string')
        .max(255),
    }),
  },
  show: {
    params: Yup.object().shape({
      uuid: Yup.string()
        .typeError('Value must be a string')
        .required()
        .test(
          'is-valid-uuidv4',
          'uuid informed is not a valid Version 4 UUID',
          // When isUUID receive undefined or null, it returns a TypeError instead of a false result (invalid uuid)
          // So the test only runs when there is a value passed to uuid, otherwise returns false
          value => (value ? isUUID(value, 4) : false)
        ),
    }),
  },
  delete: {
    params: Yup.object().shape({
      uuid: Yup.string()
        .typeError('Value must be a string')
        .required()
        .test(
          'is-valid-uuidv4',
          'uuid informed is not a valid Version 4 UUID',
          // When isUUID receive undefined or null, it returns a TypeError instead of a false result (invalid uuid)
          // So the test only runs when there is a value passed to uuid, otherwise returns false
          value => (value ? isUUID(value, 4) : false)
        ),
    }),
  },
  update: {
    params: Yup.object().shape({
      uuid: Yup.string()
        .typeError('Value must be a string')
        .required()
        .test(
          'is-valid-uuidv4',
          'uuid informed is not a valid Version 4 UUID',
          // When isUUID receive undefined or null, it returns a TypeError instead of a false result (invalid uuid)
          // So the test only runs when there is a value passed to uuid, otherwise returns false
          value => (value ? isUUID(value, 4) : false)
        ),
    }),
    // Undefined values are not updated by the model(sequelize)
    // Yup's test functions are all independent from each other, if you want to ignore
    // unset values in it you should return true for undefined values
    body: Yup.object().shape({
      board_model: Yup.string()
        .typeError('Value must be a string')
        .when({
          is: value => value === undefined,
          then: Yup.string().notRequired(),
          otherwise: Yup.string()
            .required()
            .test(
              'is-empty',
              'Value cant be empty',
              value => !isEmpty(value) && !hasOnlySpaces(value)
            ),
        }),
      serial_number: Yup.string()
        .typeError('Value must be a string')
        .when({
          is: value => value === undefined,
          then: Yup.string().notRequired(),
          otherwise: Yup.string()
            .required()
            .test(
              'is-empty',
              'Value cant be empty',
              value => !isEmpty(value) && !hasOnlySpaces(value)
            ),
        }),
      description: Yup.string()
        .typeError('Value must be a string')
        .max(255),
    }),
  },
  index: {
    query: Yup.object().shape({
      page: Yup.number()
        .typeError('page must be a number')
        .integer()
        .positive()
        .required(),
    }),
  },
};

export default SensorNodeSchema;
