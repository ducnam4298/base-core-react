import * as Yup from 'yup';
import { IForm, ControlType } from 'models/form';

export const validationSignIn = Yup.object().shape({
  email: Yup.string().required('FieldRequired').email('EmailInvalid'),
  password: Yup.string().required('FieldRequired'),
});

export const validationSignUp = Yup.object().shape({
  firstName: Yup.string().required('FieldRequired'),
  lastName: Yup.string().required('FieldRequired'),
  email: Yup.string().required('FieldRequired').email('FieldInvalid'),
  password: Yup.string().min(6, 'FieldSoShort').required('FieldRequired'),
  rePassword: Yup.string()
    .required('FieldRequired')
    .oneOf([Yup.ref('password')], 'FieldNotMatch'),
});

export const validationEmail = Yup.object().shape({
  email: Yup.string().required('FieldRequired').email('EmailInvalid'),
});
export const validationOTP = Yup.object().shape({
  otp: Yup.string().required('FieldRequired'),
});
export const validationSetPassword = Yup.object().shape({
  newPassword: Yup.string().min(6, 'FieldSoShort').required('FieldRequired'),
  rePassword: Yup.string()
    .required('FieldRequired')
    .oneOf([Yup.ref('newPassword')], 'FieldNotMatch'),
});

export const Forms: IForm[] = [
  {
    code: 'SIGNIN',
    rows: [
      {
        controls: [
          {
            id: 'email',
            title: 'Email',
            placeholder: 'Email',
            type: ControlType.Text,
            required: true,
          },
        ],
      },
      {
        controls: [
          {
            id: 'password',
            title: 'Password',
            placeholder: 'Password',
            type: ControlType.Password,
            required: true,
          },
        ],
      },
    ],
  },
  {
    code: 'SIGNUP',
    rows: [
      {
        controls: [
          {
            id: 'firstName',
            title: 'First Name',
            placeholder: 'First Name',
            maxLength: 30,
            type: ControlType.Text,
            required: true,
          },
          {
            id: 'lastName',
            title: 'Last Name',
            placeholder: 'Last Name',
            maxLength: 30,
            type: ControlType.Text,
            required: true,
          },
        ],
      },
      {
        controls: [
          {
            id: 'email',
            title: 'Email',
            placeholder: 'Email',
            type: ControlType.Text,
            required: true,
          },
        ],
      },
      {
        controls: [
          {
            id: 'password',
            title: 'Password',
            placeholder: 'Password',
            type: ControlType.Password,
            min: 8,
            required: true,
          },
        ],
      },
      {
        controls: [
          {
            id: 'rePassword',
            title: 'Re-Password',
            placeholder: 'Re-Password',
            type: ControlType.Password,
            min: 8,
            required: true,
          },
        ],
      },
    ],
  },
  {
    code: 'FORGOT',
    rows: [
      {
        controls: [
          {
            id: 'email',
            title: 'Email',
            placeholder: 'Email',
            type: ControlType.Text,
            required: true,
          },
        ],
      },
    ],
  },
  {
    code: 'ACTIVATION',
    rows: [
      {
        controls: [
          {
            id: 'otp',
            title: 'Code OTP',
            placeholder: 'Code OTP',
            type: ControlType.Text,
            required: true,
          },
        ],
      },
    ],
  },
];
