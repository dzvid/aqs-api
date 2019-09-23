import * as Joi from '@hapi/joi';

// Define the validations schemas
export default {
  sensorNode: {
    store: Joi.object().keys({
      uid: Joi.string().required(),
      eid: Joi.string().required(),
    }),
  },
};
