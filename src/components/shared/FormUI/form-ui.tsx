import React, { useState } from 'react';
import { DefaultButton, Stack } from 'office-ui-fabric-react';
import { getIn, useFormik } from 'formik';

import { ChoiceType, ControlType, IForm, IFormControl, IFormRow } from 'models/form';

import TagsInputUI from './TagsFieldUI';
import TextFieldUI from './TextFieldUI';
import UploadFileUI, { FileType } from './UploadFileUI';
import DatePickerUI from './DatePickerUI';
import DropdownVer1UI from './DropdownVer1UI';
import EditorUI from './EditorUI';
import LanguageUI from './LanguageUI';
import ToggleUI from './ToggleUI';
import FormBoxUI from './form-box-ui';

import { dateConverter } from 'constant/dateConverter';
import { ButtonUI } from 'components/templates';
import { Language } from 'models/language';
import { LanguageCode } from 'models/enum';

import './index.scss';
import ComboBoxUI from './ComboBoxUI';

interface State {
  form: IForm;
  numberBox?: number;
  listRightOptions?: RightOption[];
  initialValues: any;
  validationSchema?: any;
  onChangeTags?: (tags: string[]) => void;
  onSave?: Function;
}
export type RightOption = {
  title?: string;
  required?: boolean;
  show?: boolean;
};

type Props = State;
const FormUI = (props: Props) => {
  const [code, setCode] = useState(LanguageCode.EN.toString());
  const maxDate = dateConverter.getDateFromCurrentDate(-(16 * 365));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValues,
    validationSchema: props.validationSchema,
    onSubmit: values => {
      props.onSave && props.onSave(values);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getFieldValue = (fieldName: string) => {
    let item = formik.values.languages?.find((e: Language) => e.code === code);
    return item && item[fieldName];
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setFieldValue = (fieldName: string, v: string) => {
    let values = formik.values;
    let item = values.languages?.find((e: Language) => e.code === code);
    if (item) {
      item[fieldName] = v;
      values[fieldName] = v;
    }
    formik.setValues(values);
  };

  const errorMessage = (fieldName: string) => {
    const touched = getIn(formik.touched, fieldName);
    const error = getIn(formik.errors, fieldName);
    if (error && touched) {
      return error;
    }
    return undefined;
  };

  const FormControls = (boxNumber: number) => {
    return (
      <Stack style={{ width: '100%' }}>
        {props.form?.rows?.map((r: IFormRow, index: number) => (
          <Stack
            key={'r' + index}
            horizontal
            styles={{ root: { justifyContent: 'flex-end', width: '100%' } }}
          >
            {r.title}
            {r.controls
              ?.filter(c => c.boxNumber === boxNumber)
              .map((c: IFormControl) => {
                if (
                  c.type === ControlType.Text ||
                  c.type === ControlType.Password ||
                  c.type === ControlType.Number ||
                  c.type === ControlType.Note
                ) {
                  return (
                    <Stack
                      key={'c' + c.id}
                      styles={{
                        root: {
                          padding: '5px',
                          width: 100 / (r.controls?.length ?? 1) + '%',
                        },
                      }}
                    >
                      <TextFieldUI
                        key={'c' + c.id}
                        formik={formik}
                        control={c}
                        onChangeText={(e, value) => {
                          formik.setFieldValue(c.id, value);
                        }}
                        errorMessage={errorMessage}
                      />
                    </Stack>
                  );
                } else if (c.type === ControlType.Choice) {
                  if (c.choiceDisplay === ChoiceType.Dropdown) {
                    return (
                      <Stack
                        key={'c' + c.id}
                        id={c.id}
                        styles={{
                          root: {
                            padding: '5px',
                            width: 100 / (r.controls?.length ?? 1) + '%',
                          },
                        }}
                      >
                        <DropdownVer1UI
                          formik={formik}
                          control={c}
                          selectedKey={formik.values[c.id]}
                          onChangeDropdown={(e, option, i) => {
                            option && formik.setFieldValue(c.id, option?.key);
                          }}
                          errorMessage={errorMessage}
                        />
                      </Stack>
                    );
                  } else if (c.choiceDisplay === ChoiceType.ComboBox) {
                    return (
                      <Stack
                        key={'c' + c.id}
                        id={c.id}
                        styles={{
                          root: {
                            padding: '5px',
                            width: 100 / (r.controls?.length ?? 1) + '%',
                          },
                        }}
                      >
                        <ComboBoxUI
                          formik={formik}
                          control={c}
                          selectedKey={formik.values[c.id]}
                          onChangeComboBox={(e, option, i) => {
                            option && formik.setFieldValue(c.id, option?.key);
                          }}
                          errorMessage={errorMessage}
                        />
                      </Stack>
                    );
                  } else return <></>;
                } else if (c.type === ControlType.Toggle) {
                  return (
                    <ToggleUI
                      formik={formik}
                      control={c}
                      defaultChecked={formik.values[c.id]}
                      onChangeToggle={(e, checked) => {
                        formik.setFieldValue(c.id, checked);
                      }}
                      errorMessage={errorMessage}
                    />
                  );
                } else if (c.type === ControlType.Editor) {
                  return (
                    <Stack
                      key={'c' + c.id}
                      styles={{
                        root: {
                          padding: '5px',
                          width: 100 / (r.controls?.length ?? 1) + '%',
                        },
                      }}
                    >
                      <EditorUI
                        formik={formik}
                        control={c}
                        onChangeEditor={(content, editor) => {
                          formik.setFieldValue(c.id, content);
                        }}
                        errorMessage={errorMessage}
                      />
                    </Stack>
                  );
                } else if (c.type === ControlType.Date) {
                  return (
                    <Stack
                      key={'c' + c.id}
                      styles={{
                        root: {
                          padding: '5px',
                          width: 100 / (r.controls?.length ?? 1) + '%',
                        },
                      }}
                    >
                      <DatePickerUI
                        key={'c' + c.id}
                        formik={formik}
                        control={c}
                        value={formik.values[c.id]}
                        maxDate={maxDate}
                        isRequired={c.required}
                        onChangeDate={date => {
                          formik.setFieldValue(c.id, date);
                        }}
                        errorMessage={errorMessage}
                      />
                    </Stack>
                  );
                } else if (c.type === ControlType.Tag) {
                  return (
                    <Stack
                      key={'c' + c.id}
                      styles={{
                        root: {
                          padding: '5px',
                          width: 100 / (r.controls?.length ?? 1) + '%',
                        },
                      }}
                    >
                      <TagsInputUI
                        key={'c' + c.id}
                        id={c.id}
                        {...formik.getFieldMeta(c.id)}
                        {...formik.getFieldProps(c.id)}
                        tags={formik.values[c.id] ?? []}
                        onChangeTags={props.onChangeTags}
                        label={c.title ?? ''}
                        required={c.required ?? false}
                      />
                    </Stack>
                  );
                } else if (c.type === ControlType.Attachment) {
                  return (
                    <Stack
                      key={'c' + c.id}
                      styles={{
                        root: {
                          padding: '5px',
                          width: 100 / (r.controls?.length ?? 1) + '%',
                        },
                      }}
                    >
                      <UploadFileUI
                        {...formik.getFieldMeta(c.id)}
                        {...formik.getFieldProps(c.id)}
                        control={c}
                        height={'10rem'}
                        width={'100%'}
                        fileType={
                          c.choiceDisplay === ChoiceType.File ? FileType.File : FileType.Image
                        }
                        multiple={c.multiple}
                        accept={c.accept}
                        fieldValue={formik.values[c.id]}
                        onChangeFile={files => {
                          if (c.choiceDisplay === ChoiceType.File) {
                            formik.setFieldValue(c.id, files);
                          } else {
                            files && files[0] && formik.setFieldValue(c.id, files[0]);
                          }
                        }}
                        errorMessage={errorMessage}
                      />
                    </Stack>
                  );
                } else if (c.type === ControlType.Language) {
                  return (
                    <Stack
                      key={'c' + c.id}
                      styles={{
                        root: {
                          padding: '5px',
                          width: `${100 / 3}'%'`,
                        },
                      }}
                    >
                      <LanguageUI
                        formik={formik}
                        control={c}
                        selectedKey={code ?? LanguageCode.EN.toString()}
                        onChangeDropdown={(e, option, i) => {
                          formik.setFieldValue(c.id, option?.key);
                          option && setCode(option.key.toString());
                        }}
                        errorMessage={errorMessage(c.id)}
                      />
                    </Stack>
                  );
                } else {
                  return <></>;
                }
              })}
          </Stack>
        ))}
      </Stack>
    );
  };
  const [isShow, setShow] = useState(true);
  const { numberBox = 1, listRightOptions = [] } = props;
  const onToggle = () => setShow(!isShow);

  const rightBox = () => {
    var indents: any[] = [];
    for (var i = 0; i < numberBox; i++) {
      indents.push(
        <FormBoxUI
          required={listRightOptions[i].required ?? false}
          show={listRightOptions[i]?.show ?? true}
          title={listRightOptions[i]?.title ?? `Right box ${i + 1}`}
          key={'box' + i}
          children={FormControls(i + 1)}
        />
      );
    }
    return indents;
  };
  return (
    <>
      <div key={'form-wrapper'} className="nate-team-form-wrapper">
        <div className={`nate-team-left-form ${!isShow ? 'nate-team-w-left-hidden' : ''}`}>
          {FormControls(0)}
        </div>
        <div className={`nate-team-right-form ${!isShow ? 'nate-team-w-right-hidden' : ''}`}>
          <DefaultButton
            styles={{
              root: {
                minWidth: 'auto',
              },
            }}
            className="nate-team-btn-toggle"
            onClick={onToggle}
            text={isShow ? 'Hide' : undefined}
            iconProps={{ iconName: isShow ? 'Combine' : 'Split' }}
          />
          {isShow && <div className="nate-team-box-list">{rightBox()}</div>}
        </div>
      </div>
      <ButtonUI
        type={0}
        text={'Save'}
        iconName={'Save'}
        style={{ alignSelf: 'center', marginTop: '0.5rem' }}
        onClick={() => formik.handleSubmit()}
      />
    </>
  );
};

export { FormUI };
