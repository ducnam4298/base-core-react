import { IOption } from 'constant/optionMirror';
export interface IForm {
  mode?: IFormMode;
  code?: string;
  title?: string;
  description?: string;
  dataType?: string;
  rows?: IFormRow[];
  parentKey?: any;
}

export interface IFormRow {
  title?: string;
  controls?: IFormControl[];
}

export interface IFormControl {
  id: string;
  title?: string;
  placeholder?: string;
  type: ControlType;
  choiceDisplay?: ChoiceType;
  required?: boolean;
  readOnly?: boolean;
  default?: any;
  multiple?: boolean;
  multiline?: boolean;
  rows?: number;
  max?: number;
  min?: number;
  maxLength?: number;
  options?: IOption[];
  inputMask?: string;
  boxNumber?: number;
  accept?: string | string[];
}
export enum IFormMode {
  None,
  Add,
  Edit,
  Remove,
  Upload,
}

export enum ControlType {
  Text,
  Password,
  Number,
  Date,
  Toggle,
  Choice,
  Enum,
  Attachment,
  Note,
  Link,
  InputMask,
  Editor,
  Tag,
  Picker,
  Language,
}
export enum ChoiceType {
  ComboBox,
  Dropdown,
  Checkbox,
  Radio,
  Suggest,
  Image,
  File,
}

export enum IFormAuthAction {
  None = 0,
  Signin,
  Signup,
  Signout,
  Forgot,
  Activation,
  SetPassword,
}
