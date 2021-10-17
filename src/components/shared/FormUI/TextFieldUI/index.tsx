import React from 'react';
import { FormikValues } from 'formik';
import {
  IStyleFunctionOrObject,
  ITextFieldStyleProps,
  ITextFieldStyles,
  TextField,
} from 'office-ui-fabric-react';
import { ControlType, IFormControl } from 'models/form';
import { ConvertType } from 'constant/optionMirror';
interface UIProps {
  formik: FormikValues;
  control: IFormControl;
  onChangeText?: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void;
  errorMessage?: (fieldName: string) => string | undefined;
}

const TextFieldUI = (props: UIProps) => {
  const { formik, control, onChangeText, errorMessage } = props;
  return (
    <TextField
      {...formik.getFieldProps(control?.id)}
      {...formik.getFieldMeta(control?.id)}
      key={'text-field' + control?.id}
      id={'text-field' + control?.id}
      styles={TextFieldStyles}
      min={control.min}
      max={control.max}
      accept={control.accept}
      maxLength={control?.maxLength}
      disabled={control?.readOnly ?? false}
      required={control?.required ?? false}
      label={control?.title ?? ''}
      placeholder={control?.placeholder ?? ''}
      rows={control?.rows ? control?.rows : 1}
      multiline={control?.multiline ? true : false}
      type={ConvertType(control?.type)}
      onChange={onChangeText}
      canRevealPassword={control?.type === ControlType.Password}
      errorMessage={errorMessage && errorMessage(control?.id)}
    />
  );
};
export const TextFieldStyles: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles> = {
  root: {
    maxHeight: 95,
  },
  field: {
    borderRadius: '5px',
    selectors: {
      '&:hover': {
        opacity: 0.7,
        cursor: 'pointer !important',
      },
      //   '::placeholder': {
      //     color: '#3699ff',
      //   },
      //   '&:hover::placeholder': {
      //     opacity: 0.7,
      //   },
      //   '&:focus::placeholder': {
      //     color: '#3699ff',
      //   },
      //   '&:after::placeholder': {
      //     color: '#3699ff',
      //   },
      //   '&:before::placeholder': {
      //     color: '#3699ff',
      //   },
    },
  },
  fieldGroup: {
    border: '1px solid #D1D8E7 !important',
    background: '#F6F8FF',
    height: 38.8,
    selectors: {
      '&:before::placeholder': {
        border: '1px solid #D1D8E7',
      },
      '&:after': {
        border: '1px solid #D1D8E7',
      },
      '&:hover': {
        border: '1px solid #D1D8E7',
        opacity: 0.7,
        cursor: 'pointer !important',
      },
    },
  },
};
export default TextFieldUI;
