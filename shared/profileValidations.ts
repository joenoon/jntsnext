import Yup from 'yup';

const profileValidations = {
  name: Yup.string()
    .min(3, 'Name is too short.')
    .max(40, 'Name cannot be longer than 40 characters.')
    .required('Name is required.'),
  about: Yup.string().max(
    1000,
    'About cannot be longer than 1000 characters.',
  ),
};

export const profileValidationSchemaFull = Yup.object().shape(
  profileValidations,
);