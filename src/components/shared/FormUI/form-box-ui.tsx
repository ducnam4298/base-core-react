import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Stack, ActionButton, Label, Text } from 'office-ui-fabric-react';
import './index.scss';

interface UIProps {
  title?: string;
  required?: boolean;
  children?: React.ReactNode;
  show?: boolean;
}

const FormBoxUI = (props: UIProps) => {
  const { title, required, children, show } = props;
  const [isShow, setShow] = useState(show ?? true);
  const onToggle = () => setShow(!isShow);
  return (
    <Card className="nate-team-right-box">
      <CardHeader style={{ padding: '0.5rem' }}>
        <Stack
          horizontal
          verticalAlign="center"
          style={{ justifyContent: 'space-between', alignItems: 'end' }}
        >
          <Label>
            {title} {required === true && <Text style={{ color: 'red' }}>*</Text>}
          </Label>
          <ActionButton
            onClick={onToggle}
            style={{ height: 'auto' }}
            iconProps={{ iconName: !isShow ? 'FlickUp' : 'FlickDown' }}
          />
        </Stack>
      </CardHeader>
      <CardBody className={`${!isShow ? 'box-hidden' : 'box-show'}`}>{isShow && children}</CardBody>
    </Card>
  );
};

export default FormBoxUI;
