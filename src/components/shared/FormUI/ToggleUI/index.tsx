import React from 'react';
import { FormikValues } from 'formik';
import { Toggle } from 'office-ui-fabric-react';
import { IFormControl } from 'models/form';
interface UIProps {
  formik: FormikValues;
  control: IFormControl;
  defaultChecked?: boolean;
  onChangeToggle?: (event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => void;
  errorMessage?: (fieldName: string) => string | undefined;
}
const ToggleUI = (props: UIProps) => {
  const { formik, control, defaultChecked, onChangeToggle } = props;
  return (
    <Toggle
      {...formik.getFieldMeta(control.id)}
      {...formik.getFieldProps(control.id)}
      key={control.id}
      id={control.id}
      styles={{ root: { padding: '5px' } }}
      label={control?.title ?? ''}
      defaultChecked={defaultChecked}
      onChange={(e, checked) => {
        onChangeToggle && onChangeToggle(e, checked);
      }}
    />
  );
};

export default ToggleUI;
