import { CSSProperties, useEffect, useMemo } from 'react';
import { Image, ImageFit, Stack } from 'office-ui-fabric-react';
import { useFilePicker } from 'hook';
import * as Assets from 'assets';
type UIProps = {
  fileItems?: any;
  fieldName?: string;
  maxSize?: number;
  onChange?: Function;
  type: 'avatar' | 'cover';
  isUpload?: boolean;
  accept?: any;
  height?: number | string;
  width?: number | string;
};

const SelfImageUI = (props: UIProps) => {
  const [openFileSelector, { plainFiles }] = useFilePicker({
    accept: ['image/png', 'image/jpg', 'image/jpeg'],
    multiple: false,
    readAs: 'DataURL',
    readFilesContent: true,
  });
  const onChange = () => {
    if (!props.onChange) return;
    else props.onChange(props.fieldName, plainFiles[0]);
  };
  useEffect(() => {
    if (plainFiles) onChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plainFiles]);
  const imgPreView = useMemo(() => {
    if (!props.fileItems) return '';
    if (plainFiles && plainFiles.length === 1) {
      return URL.createObjectURL(plainFiles[0]);
    } else {
      return props.fileItems;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.fileItems || plainFiles]);

  const spanStyle: CSSProperties = {
    backgroundColor: '#00000080',
    position: 'absolute',
    cursor: 'pointer',
    width: 30,
    height: 30,
    bottom: 0,
    right: props.type === 'cover' ? 0 : '1rem',
    borderRadius: props.type === 'cover' ? 0 : '15px',
    alignItems: 'center',
  };
  const iconStyle: CSSProperties = {
    height: '100%',
    width: props.type === 'cover' ? '100%' : 20,
  };

  return props.type === 'cover' ? (
    <Stack
      style={{
        position: 'absolute',
        marginBottom: 10,
        width: '100%',
      }}
    >
      <Image
        src={imgPreView ?? props.fileItems}
        style={{
          borderWidth: 0,
          width: '100%',
          height: 220,
        }}
      />
      {props.isUpload === true && (
        <Stack style={spanStyle} onClick={() => openFileSelector()}>
          <Assets.Camera style={iconStyle} />
        </Stack>
      )}
    </Stack>
  ) : (
    <Stack
      style={{
        height: props.height ?? 120,
        width: props.width ?? 120,
        borderRadius: '50%',
        border: '1px solid #c8ced3',
        backgroundColor: '#f0f3f5',
        zIndex: 10,
        position: 'relative',
      }}
    >
      <Image
        src={imgPreView ?? props.fileItems}
        imageFit={ImageFit.cover}
        alt={props.type}
        width={'100%'}
        height={'100%'}
        style={{ borderRadius: '50%' }}
      />
      {props.isUpload === true && (
        <Stack style={spanStyle} onClick={() => openFileSelector()}>
          <Assets.Camera style={iconStyle} />
        </Stack>
      )}
    </Stack>
  );
};

export default SelfImageUI;
