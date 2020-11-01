import * as Yup from 'yup';

import isUUID from 'validator/lib/isUUID';
import { parseISO, isValid } from 'date-fns';

const ReadingSchema = {
  store: {
    body: Yup.object().shape({
      sensor_node: Yup.object().shape({
        uuid: Yup.string()
          .typeError('uuid must be a string')
          .required()
          .test(
            'is-valid-uuidv4',
            'Not a valid uuid',
            // When isUUID receive undefined or null, it returns a TypeError instead of a false result (invalid uuid)
            // So the test only runs when there is a value passed to uuid, otherwise returns false
            value => (value ? isUUID(value, 4) : false)
          ),
      }),
      reading: Yup.object().shape({
        relative_humidity: Yup.number()
          .min(0, 'relative_humidity minimal value is 0%')
          .max(100, 'relative_humidity max value is 100%')
          .typeError('relative_humidity must be a number type')
          .notRequired()
          .nullable(),
        temperature: Yup.number()
          .min(-273.15, 'temperature minimal value is -273.15 °C')
          .typeError('temperature must be a number type')
          .notRequired()
          .nullable(),
        pressure: Yup.number()
          .min(0, 'pressure minimal value is 0 hectoPa')
          .typeError('pressure must be a number type')
          .notRequired()
          .nullable(),
        ozone: Yup.number()
          .min(0, 'ozone minimal concentration is 0 µg/m3')
          .typeError('ozone must be a number type')
          .notRequired()
          .nullable(),
        pm2_5: Yup.number()
          .min(0, 'pm2.5 minimal concentration is 0 µg/m3')
          .typeError('pm2.5 must be a number type')
          .notRequired()
          .nullable(),
        pm10: Yup.number()
          .min(0, 'pm10 minimal concentration is 0 µg/m3')
          .typeError('pm10 must be a number type')
          .notRequired()
          .nullable(),
        carbon_monoxide: Yup.number()
          .min(0, 'carbon monoxide minimal concetration is 0 ppm')
          .typeError('carbon monoxide must be a number type')
          .notRequired()
          .nullable(),
        collected_at: Yup.string()
          .typeError('date value must be a string in ISO format')
          .required()
          .test(
            'is-valid-date',
            'Invalid date provided, date value must be a string in ISO format',
            value => isValid(parseISO(value))
          ),
      }),
    }),
  },
  index: {
    params: Yup.object().shape({
      uuid: Yup.string()
        .typeError('Value must be a string')
        .required()
        .test(
          'is-valid-uuidv4',
          'Not a valid uuid',
          // When isUUID receive undefined or null, it returns a TypeError instead of a false result (invalid uuid)
          // So the test only runs when there is a value passed to uuid, otherwise returns false
          value => (value ? isUUID(value, 4) : false)
        ),
    }),
    query: Yup.object().shape({
      date: Yup.string()
        .typeError('date value must be a string in ISO format')
        .required()
        .test(
          'is-valid-date',
          'Invalid date provided, date value must be a string in ISO format',
          value => isValid(parseISO(value))
        ),
    }),
  },
};

export default ReadingSchema;
