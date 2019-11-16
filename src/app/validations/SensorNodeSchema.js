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
          'Value informed is not a valid Version 4 UUID',
          value => isUUID(value, 4)
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
          'Value informed is not a valid Version 4 UUID',
          value => isUUID(value, 4)
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
          'Value informed is not a valid Version 4 UUID',
          value => isUUID(value, 4)
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
};

export default SensorNodeSchema;
