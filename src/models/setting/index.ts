import { ChoiceType, ControlType } from '../form';
interface ISetting {
  title?: string;
  mode?: ModeContent;
  rows?: ISettingRow[];
}

interface ISettingRow {
  title?: string;
  controls?: ISettingControl[];
}
interface ISettingControl {
  label?: string;
  span?: string;
  type?: ControlType;
  choiceDisplay?: ChoiceType;
}

export enum ModeContent {
  Header = 1,
  Body = 2,
  Footer = 3,
}

export type { ISetting, ISettingRow, ISettingControl };
