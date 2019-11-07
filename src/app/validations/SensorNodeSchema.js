import * as Yup from 'yup';

import isUUID from 'validator/lib/isUUID';

const SensorNodeSchema = {
  store: {
    body: Yup.object().shape({
      board_model: Yup.string()
        .typeError('Value must be a string')
        .required(),
      serial_number: Yup.string()
        .typeError('Value must be a string')
        .required(),
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
};

export default SensorNodeSchema;
