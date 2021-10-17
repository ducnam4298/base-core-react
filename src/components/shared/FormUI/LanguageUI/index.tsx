import React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { FormikValues } from 'formik';
import { IFormControl } from 'models/form';
import { DropDownStyles } from '../DropdownVer1UI';
import { LanguageOptions } from 'constant/optionMirror';

interface UIProps {
  formik: FormikValues;
  control: IFormControl;
  selectedKey?: string;
  onChangeDropdown?: (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => void;
  errorMessage?: (fieldName: string) => string;
}

const LanguageUI = (props: UIProps) => {
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
      options={LanguageOptions}
      selectedKey={selectedKey}
      onChange={(e, option, i) => {
        option && onChangeDropdown && onChangeDropdown(e, option, i);
      }}
      errorMessage={errorMessage && errorMessage(control?.id)}
    />
  );
};

export default LanguageUI;
