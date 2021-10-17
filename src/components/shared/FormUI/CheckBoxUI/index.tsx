import { FormikValues } from 'formik';
import { IFormControl } from 'models/form';
import {
  Checkbox,
  ICheckboxStyleProps,
  ICheckboxStyles,
  IStyleFunctionOrObject,
} from 'office-ui-fabric-react';

interface UIProps {
  formik: FormikValues;
  control: IFormControl;
  errorMessage?: (fieldName: string) => string | undefined;
}

const CheckBoxUI = (props: UIProps) => {
  const { formik, control } = props;
  return (
    <Checkbox
      {...formik.getFieldMeta(control?.id)}
      {...formik.getFieldProps(control?.id)}
      key={'check-box' + control.id}
      id={'check-box' + control.id}
      styles={CheckBoxStyles}
      label={control?.title ?? ''}
      checked={formik.values[control.id]}
      value={formik.values[control.id]}
      onChange={(e, value) => formik.setFieldValue(control.id, value)}
    />
  );
};

export const CheckBoxStyles: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles> = {};

export default CheckBoxUI;
