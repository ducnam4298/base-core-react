import React, { useEffect, useMemo } from 'react';
import { useFilePicker } from 'hook';
import { Icon, Image, Label, Stack, Text } from 'office-ui-fabric-react';
import { IFormControl } from 'models/form';
import { ErrorMessageUI } from 'components/templates';
import * as Assets from 'assets';

export enum FileType {
  Image,
  File,
}

interface UIProps {
  control: IFormControl;
  width: string | number;
  height: string | number;
  fileType: FileType;
  multiple?: boolean;
  accept?: string | string[];
  fieldValue?: any;
  minSize?: number;
  maxSize?: number;
  onChangeFile?: (file?: File[]) => void;
  errorMessage?: (fieldName: string) => string;
}

const UploadFileUI = (props: UIProps) => {
  const {
    control,
    width,
    height,
    fileType,
    multiple,
    accept,
    fieldValue,
    maxSize,
    minSize,
    onChangeFile,
    errorMessage,
  } = props;
  const [openFileSelector, { plainFiles }] = useFilePicker({
    accept: accept,
    multiple: multiple ?? false,
    limitFilesConfig: { min: minSize ?? 1, max: maxSize },
  });
  useEffect(() => {
    if (plainFiles.length > 1) {
      onChangeFile && onChangeFile(plainFiles);
    } else if (plainFiles.length === 1) {
      onChangeFile && onChangeFile(plainFiles);
    } else {
      onChangeFile && onChangeFile(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plainFiles, fieldValue]);

  const UploadFile = useMemo(() => {
    return fileType === FileType.File ? (
      <Stack>
        <Stack
          horizontal
          styles={{
            root: {
              height: '28.8px',
              padding: 0,
              marginTop: '0.5rem',
              minWidth: '5.5rem',
              maxWidth: '6.5rem',
              justifyContent: 'space-evenly',
              border: '1px solid #d1d8e7',
              borderRadius: 2,
              cursor: 'pointer',
              selectors: { '&:hover': { opacity: 0.7 } },
            },
          }}
          onClick={openFileSelector}
        >
          {fieldValue && fieldValue.length > 0 ? (
            <>
              <Assets.UpdateFile fill={'#d1d8e7'} style={{ height: 'auto', width: '1rem' }} />
              <Label style={{ fontSize: 12, cursor: 'pointer' }}>UpdateFile</Label>
            </>
          ) : (
            <>
              <Assets.UploadFile fill={'#d1d8e7'} style={{ height: 'auto', width: '1rem' }} />
              <Label style={{ fontSize: 12, cursor: 'pointer' }}>UploadFile</Label>
            </>
          )}
        </Stack>
        <Stack>
          {plainFiles && plainFiles.length ? (
            plainFiles.map((file: File, index: number) => (
              <Stack horizontal tokens={{ childrenGap: 10 }} style={{ alignItems: 'center' }}>
                <Label>{file.name}</Label>
                <Assets.RemoveFile
                  fill={'red'}
                  style={{
                    height: '0.7rem',
                    width: 'auto',
                    cursor: 'pointer',
                  }}
                  onClick={() => onChangeFile && onChangeFile(plainFiles.splice(index, 1))}
                />
              </Stack>
            ))
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    ) : (
      <Stack
        styles={{
          root: {
            width: width ?? '4rem',
            height: height ?? '4rem',
            borderRadius: 2,
            border: '1px solid #d1d8e7',
            background: '#f6f8ff',
            position: 'relative',
            selectors: {
              '&:hover': {
                opacity: 0.7,
                cursor: 'pointer',
              },
            },
          },
        }}
        onClick={openFileSelector}
      >
        {!fieldValue ? (
          <Icon
            iconName={'Camera'}
            style={{ margin: 'auto', color: '#d1d8e7', fontSize: '2rem' }}
          />
        ) : (
          <>
            <Image
              src={plainFiles.length > 0 ? URL.createObjectURL(fieldValue) : fieldValue}
              styles={{
                root: {
                  width: width ?? '4rem',
                  height: height ?? '4rem',
                  borderRadius: 2,
                  selectors: {
                    '&:hover': {
                      opacity: 0.7,
                      cursor: 'pointer',
                    },
                  },
                },
                image: {
                  width: '100%',
                  height: 'auto',
                },
              }}
            />
            <Assets.Close
              fill={'red'}
              style={{
                position: 'absolute',
                top: '2%',
                right: '1%',
                width: '1rem',
                height: 'auto',
              }}
            />
          </>
        )}
      </Stack>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValue, plainFiles]);
  return (
    <>
      {control.title && (
        <Stack horizontal>
          <Label>
            {control.title}
            {control.required && <Text style={{ color: 'red' }}>*</Text>}
          </Label>
        </Stack>
      )}
      {UploadFile}
      {errorMessage && <ErrorMessageUI message={errorMessage(control.id)} />}
    </>
  );
};

export default UploadFileUI;
