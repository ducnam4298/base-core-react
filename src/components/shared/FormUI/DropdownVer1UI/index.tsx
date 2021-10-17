import React from 'react';
import { FormikValues } from 'formik';
import { IFormControl } from 'models/form';
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyleProps,
  IDropdownStyles,
  IStyleFunctionOrObject,
} from 'office-ui-fabric-react';

interface UIProps {
  formik: FormikValues;
  control: IFormControl;
  onChangeDropdown?: (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => void;
  selectedKey?: string | number | string[] | number[] | null;
  errorMessage?: (fieldName: string) => string | undefined;
}
const DropdownVer1UI = (props: UIProps) => {
  const { formik, control, selectedKey, onChangeDropdown, errorMessage } = props;
  return (
    <Dropdown
      {...formik.getFieldProps(control?.id)}
      {...formik.getFieldMeta(control?.id)}
      key={'drop-down-v1' + control?.id}
      id={'drop-down-v1' + control?.id}
      styles={DropDownStyles}
      disabled={control.readOnly ?? false}
      required={control.required ?? false}
      label={control?.title ?? ''}
      placeholder={control.placeholder}
      options={control?.options ?? []}
      selectedKey={selectedKey}
      onChange={onChangeDropdown}
      onBlur={() => formik.setFieldTouched(control.id, true)}
      errorMessage={errorMessage && errorMessage(control?.id)}
    />
  );
};

export const DropDownStyles: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles> = {
  dropdown: {
    selectors: {
      '&:after': {
        border: '1px solid #d1d8e7 !important',
        borderColor: '#d1d8e7 !important',
      },
      '&:hover': { backgroundColor: 'none', opacity: 0.7 },
    },
  },
  title: {
    border: '1px solid #d1d8e7 !important',
    height: 38.8,
    padding: '2px 28px 0px 8px',
    background: '#f6f8ff',
  },
  errorMessage: { color: 'red' },
  caretDownWrapper: { top: 5 },
};

export default DropdownVer1UI;
