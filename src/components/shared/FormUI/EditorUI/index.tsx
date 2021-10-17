import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { FormikValues } from 'formik';
import { IFormControl } from 'models/form';
import { ErrorMessageUI } from 'components/templates';
import { Label, Text } from 'office-ui-fabric-react';
import './index.scss';

interface UIProps {
  formik: FormikValues;
  control: IFormControl;
  onChangeEditor?: (content: string, editor: TinyMCEEditor) => void;
  errorMessage?: (fieldName: string) => string | undefined;
}

const EditorUI = (props: UIProps) => {
  const { formik, control, onChangeEditor, errorMessage } = props;
  return (
    <>
      <Label>
        {control.title} {control.required && <Text style={{ color: 'red' }}>*</Text>}
      </Label>
      <Editor
        apiKey="z1mntph9svsj9hxj92tnwn79zsuoj0w8v3849cw1e1q27u14"
        initialValue={formik.values[control.id]}
        init={{
          skin: 'snow',
          icons: 'thin',
          placeholder: control.placeholder,
          font_css: "./index.scss",
          height: 400,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen textcolor ',
            'insertdatetime media table paste code help wordcount',
          ],
          textcolor_rows: '4',
          toolbar:
            'undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent ',
        }}
        onEditorChange={onChangeEditor}
        outputFormat="html"
        toolbar="code"
      />
      {errorMessage && <ErrorMessageUI message={errorMessage(control.id)} />}
    </>
  );
};

export default EditorUI;
