import React from 'react';
import { DefaultButton, IButtonStyles, PrimaryButton } from 'office-ui-fabric-react';

interface UIProps {
  type?: TypeButton;
  text: string;
  iconName?: string;
  style?: React.CSSProperties;
  styles?: IButtonStyles;
  onClick?: Function;
  disabled?: boolean;
}
export enum TypeButton {
  Primary,
  Default,
}

const ButtonUI = (props: UIProps) => {
  return props.type === TypeButton.Primary ? (
    <PrimaryButton
      iconProps={{ iconName: props.iconName }}
      style={{ ...props.style, whiteSpace: 'nowrap', border: 'none' }}
      disabled={props.disabled}
      styles={props.styles}
      text={props.text}
      onClick={() => props.onClick && props.onClick()}
    />
  ) : (
    <DefaultButton
      iconProps={{ iconName: props.iconName }}
      style={{ ...props.style, whiteSpace: 'nowrap', border: 'none' }}
      disabled={props.disabled}
      styles={props.styles}
      text={props.text}
      onClick={() => props.onClick && props.onClick()}
    />
  );
};

export default ButtonUI;
