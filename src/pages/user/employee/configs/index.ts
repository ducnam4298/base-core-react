import * as Yup from 'yup';
import { GenderOptions } from 'constant/optionMirror';
import { ChoiceType, ControlType, IForm } from 'models/form';
import { IColumn, IContextualMenuItem } from 'office-ui-fabric-react';
import { regex } from 'constant/regex';
import { User } from 'models/user';
import Cities from 'assets/data/cities.json';

const FieldRequired = 'FieldRequired';
const FieldSoShort = 'FieldSoShort';
const FieldSoLong = 'FieldSoLong';

export const initValuesDefault: User = {
  fullName: undefined,
  phoneNumber: undefined,
  email: undefined,
  dob: undefined,
  gender: undefined,
  coverImage: undefined,
  profileImage: undefined,
  contract: undefined,
  address: undefined,
  pob: undefined,
};
export const validationCreateSchema = Yup.object().shape({
  fullName: Yup.string().min(3, FieldSoShort).max(60, FieldSoLong).required(FieldRequired),
  phoneNumber: Yup.string()
    .matches(regex.phoneRegex, 'Phone Number not exist')
    .required(FieldRequired),
  email: Yup.string().email('EmailInvalid').max(100, FieldSoLong).required(FieldRequired),
  dob: Yup.string().required(FieldRequired),
  gender: Yup.number().required(FieldRequired),
  coverImage: Yup.string().required(FieldRequired),
  profileImage: Yup.string().required(FieldRequired),
  contract: Yup.array().defined().required(FieldRequired),
  descriptions: Yup.string().required(FieldRequired),
  address: Yup.string().required(FieldRequired),
  pob: Yup.string().required(FieldRequired),
});

export const Forms: IForm[] = [
  {
    title: 'Create User',
    code: 'Create',
    rows: [
      {
        controls: [
          {
            id: 'fullName',
            type: ControlType.Text,
            title: 'Full Name',
            placeholder: 'Full Name',
            maxLength: 30,
            required: true,
            boxNumber: 0,
          },
        ],
      },
      {
        controls: [
          {
            id: 'phoneNumber',
            type: ControlType.Text,
            title: 'Phone Number',
            placeholder: 'Phone Number',
            maxLength: 30,
            required: true,
            boxNumber: 0,
          },
        ],
      },
      {
        controls: [
          {
            id: 'email',
            type: ControlType.Text,
            title: 'Email',
            placeholder: 'Email',
            maxLength: 60,
            required: true,
            boxNumber: 0,
          },
        ],
      },
      {
        controls: [
          {
            id: 'dob',
            type: ControlType.Date,
            title: 'Day Of Birth',
            placeholder: 'Day Of Birth',
            required: true,
            boxNumber: 0,
          },
          {
            id: 'address',
            type: ControlType.Text,
            title: 'Address',
            placeholder: 'Address',
            maxLength: 30,
            required: true,
            boxNumber: 0,
          
          },
        ],
      },
      {
        controls: [
          {
            id: 'gender',
            type: ControlType.Choice,
            choiceDisplay: ChoiceType.Dropdown,
            title: 'Gender',
            placeholder: 'Gender',
            default: GenderOptions[0].key,
            options: GenderOptions,
            required: true,
            boxNumber: 0,
          },
          {
            id: 'pob',
            type: ControlType.Choice,
            choiceDisplay: ChoiceType.ComboBox,
            title: 'Place of birth',
            placeholder: 'Place of birth',
            default: Cities[0].key,
            options: Cities,
            required: true,
            boxNumber: 0,
          },
        ],
      },
      {
        controls: [
          {
            id: 'profileImage',
            type: ControlType.Attachment,
            choiceDisplay: ChoiceType.Image,
            multiple: false,
            accept: ['.png', '.jpg', '.jpeg'],
            required: true,
            boxNumber: 1,
          },
        ],
      },
      {
        controls: [
          {
            id: 'coverImage',
            type: ControlType.Attachment,
            choiceDisplay: ChoiceType.Image,
            multiple: false,
            accept: ['.png', '.jpg', '.jpeg'],
            required: true,
            boxNumber: 2,
          },
        ],
      },
      {
        controls: [
          {
            id: 'descriptions',
            type: ControlType.Editor,
            title: 'Descriptions',
            placeholder: 'Descriptions',
            required: true,
            boxNumber: 0,
          },
        ],
      },
      {
        controls: [
          {
            id: 'contract',
            type: ControlType.Attachment,
            choiceDisplay: ChoiceType.File,
            multiple: false,
            accept: ['.doc', '.docx', '.xls', '.xlsx'],
            required: true,
            boxNumber: 3,
          },
        ],
      },
    ],
  },
];

export const Columns: IColumn[] = [
  {
    key: 'STT',
    name: 'No',
    fieldName: 'id',
    minWidth: 20,
    maxWidth: 40,
    data: 'string',
  },
  {
    key: 'FullName',
    name: 'FullName',
    fieldName: 'fullName',
    minWidth: 100,
    maxWidth: 200,
    data: 'string',
  },
  {
    key: 'DayOfBirth',
    name: 'BirthDay',
    fieldName: 'dob',
    minWidth: 100,
    maxWidth: 120,
    data: 'string',
  },
  {
    key: 'Email',
    name: 'Email',
    fieldName: 'email',
    minWidth: 150,
    maxWidth: 250,
    data: 'string',
  },
  {
    key: 'Status',
    name: 'Status',
    fieldName: 'status',
    minWidth: 120,
    maxWidth: 150,
    data: 'boolean',
  },
  {
    key: 'ModifiedDate',
    name: 'ModifiedDate',
    fieldName: 'modifiedDate',
    minWidth: 100,
    maxWidth: 120,
    data: 'string',
  },
  {
    key: 'Actions',
    name: 'Actions',
    fieldName: 'id',
    minWidth: 120,
    maxWidth: 150,
  },
];

export const MenuActions: IContextualMenuItem[] = [
  {
    key: 'Details',
    iconProps: {
      iconName: 'ContextMenu',
    },
    text: 'Profile',
  },
  {
    key: 'Update',
    iconProps: {
      iconName: 'Edit',
      style: {
        color: 'salmon',
      },
    },
    text: 'Edit',
  },
  {
    key: 'ResetPassword',
    iconProps: {
      iconName: 'ProtectRestrict',
      style: {
        color: 'red',
      },
    },
    text: 'ResetPassword',
  },
];
