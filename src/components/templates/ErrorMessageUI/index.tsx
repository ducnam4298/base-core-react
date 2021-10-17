import React from 'react';
import { Text } from 'office-ui-fabric-react';
type UIProps = {
  message?: any;
  className?: any;
};
const ErrorMessageUI = (props: UIProps) => {
  const { message, className } = props;
  return (
    <Text
      style={{
        paddingTop: 5,
        marginLeft: 5,
        fontSize: 12,
        color: 'red',
      }}
      className={className}
    >
      {message}
    </Text>
  );
};
export default ErrorMessageUI;
