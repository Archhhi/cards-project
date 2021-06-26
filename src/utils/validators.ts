import * as Yup from 'yup';

export const LoginValidate = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(4, 'Too Long!')
    .max(50, 'Too Long!')
    .required('Required'),
})