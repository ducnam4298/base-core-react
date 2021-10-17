import { FormikValues } from 'formik';
import { IFormControl } from 'models/form';
import {
  ComboBox,
  DirectionalHint,
  IComboBoxStyles,
  IDropdownOption,
} from 'office-ui-fabric-react';

interface UIProps {
  formik: FormikValues;
  control: IFormControl;
  onChangeComboBox?: (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => void;
  selectedKey?: string | number | string[] | number[] | null;
  errorMessage?: (fieldName: string) => string | undefined;
}

const ComboBoxUI = (props: UIProps) => {
  const { formik, control, selectedKey, onChangeComboBox, errorMessage } = props;
  return (
    <ComboBox
      {...formik.getFieldProps(control?.id)}
      {...formik.getFieldMeta(control?.id)}
      key={'combobox' + control?.id}
      id={'combobox' + control?.id}
      style={{ borderColor: '#d1d8e7 !important' }}
      styles={ComboBoxStyles}
      disabled={control.readOnly ?? false}
      required={control.required ?? false}
      label={control?.title ?? ''}
      placeholder={control.placeholder}
      options={control?.options ?? []}
      selectedKey={selectedKey}
      onChange={onChangeComboBox}
      onBlur={() => formik.setFieldTouched(control.id, true)}
      errorMessage={errorMessage && errorMessage(control?.id)}
      allowFreeform
      autoComplete="on"
      caretDownButtonStyles={{
        root: {
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          selectors: {
            '&:hover': {
              background: '#f6f8ff !important',
            },
          },
        },
      }}
      calloutProps={{
        styles: {
          calloutMain: {
            maxHeight: '15rem !important',
            width: '10rem',
          },
        },
        directionalHint: DirectionalHint.bottomLeftEdge,
      }}
    />
  );
};

export const ComboBoxStyles: Partial<IComboBoxStyles> = {
  root: {
    height: 38.8,
    backgroundColor: '#f6f8ff',
    borderColor: '#d1d8e7 !important',
    selectors: {
      '&:hover': {
        opacity: 0.7,
        cursor: 'pointer',
      },
      '&::after': {
        borderWidth: '1px !important',
        borderColor: '#d1d8e7 !important',
      },
      '&:focus::after': {
        border: '1px solid #d1d8e7 !important',
      },
      '&:hover::after': {
        borderColor: '#d1d8e7 !important',
      },
    },
  },
  input: {
    backgroundColor: '#f6f8ff',
    selectors: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  errorMessage: {
    color: 'red',
  },
};

export default ComboBoxUI;
