import * as Yup from 'yup';

const SensorNodeSchema = {
  store: {
    body: Yup.object().shape({
      board_model: Yup.string().required(),
      serial_number: Yup.string().required(),
      description: Yup.string().max(255),
    }),
  },
};

export default SensorNodeSchema;
