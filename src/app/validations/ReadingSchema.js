import * as Yup from 'yup';

import isUUID from 'validator/lib/isUUID';
import { parseISO, isValid } from 'date-fns';

const ReadingSchema = {
  store: {
    body: Yup.object().shape({
      humidity: Yup.number()
        .typeError('humidity must be a number type')
        .notRequired(),
      temperature: Yup.number()
        .typeError('temperature must be a number type')
        .notRequired(),
      pressure: Yup.number()
        .typeError('pressure must be a number type')
        .notRequired(),
      uuid: Yup.string()
        .typeError('uuid must be a string')
        .required()
        .test(
          'is-valid-uuidv4',
          'uuid informed is not a valid Version 4 UUID',
          // When isUUID receive undefined or null, it returns a TypeError instead of a false result (invalid uuid)
          // So the test only runs when there is a value passed to uuid, otherwise returns false
          value => (value ? isUUID(value, 4) : false)
        ),
      ozone: Yup.number()
        .typeError('ozone must be a number type')
        .required(),
      pm2_5: Yup.number()
        .typeError('pm2.5 must be a number type')
        .required(),
      pm10: Yup.number()
        .typeError('pm10 must be a number type')
        .required(),
      carbon_monoxide: Yup.number()
        .typeError('carbon monoxide must be a number type')
        .required(),
      collected_at: Yup.string()
        .typeError('date value must be an string with ISO format')
        .required()
        .test(
          'is-valid-date',
          'Invalid date provided, date value must be an string in ISO format',
          value => isValid(parseISO(value))
        ),
    }),
  },
  index: {
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
    query: Yup.object().shape({
      date: Yup.string()
        .typeError('date value must be an string with ISO format')
        .required()
        .test(
          'is-valid-date',
          'Invalid date provided, date value must be an string in ISO format',
          value => isValid(parseISO(value))
        ),
    }),
  },
};

export default ReadingSchema;
