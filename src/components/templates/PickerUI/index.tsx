import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Label, Text, Stack, Persona, PersonaSize, Icon, TextField } from 'office-ui-fabric-react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { Row } from 'reactstrap';
import { useConfig } from 'hook';
import { User } from 'models/user';

interface UIProps {
  title?: string;
  required?: boolean;
  fetching?: boolean;
  onFetchData?: (value: string) => void;
  placeholder?: string;
  dataSelected?: User[];
  dataFetch?: User[] | null;
  onChangeSelected?: any;
  onResetDataFetch?: any;
  disabled?: boolean;
  position?: 'left';
  textAdded?: string;
}

interface CustomUser extends User {
  joined?: boolean;
}

const PickerUI = (props: UIProps) => {
  const [value, setValue] = useState<string>('');
  const [showData, setShowData] = useState<boolean>(false);
  const dataRef = useRef<HTMLUListElement>(null);
  const DefaultUserAvatar = useConfig('DefaultUserAvatar');

  const { dataSelected = [], dataFetch = [], onResetDataFetch = () => {} } = props;

  const fetchList = useMemo(() => {
    const selectedIdList = (dataSelected ?? []).map(item => item.id);
    return (dataFetch ?? []).map(item => {
      if (selectedIdList.includes(item?.id)) {
        return {
          ...item,
          joined: true,
        };
      }
      return item;
    });
  }, [dataSelected, dataFetch]);

  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    let value = newValue?.trimStart();
    value && value?.length >= 3 && delayedQuery(value);
    value && setValue(value);
    value && value.length >= 3 ? setShowData(true) : setShowData(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(
    debounce(q => handleDelaySearch(q), 1000),
    []
  );

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (dataRef.current?.contains(event.target as Node)) return;
      setShowData(false);
      setValue('');
      onResetDataFetch && onResetDataFetch();
    },
    [onResetDataFetch]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  const handleSelect = (user: User) => {
    let tmp = [...(props.dataSelected ?? []), user];
    // setShowData(false)
    // setValue('')
    // props.onResetDataFetch && props.onResetDataFetch()
    props.onChangeSelected && props.onChangeSelected(tmp);
  };

  const handleDeleteFile = (index: number) => {
    let tmp = [...(props.dataSelected ?? [])];
    tmp.splice(index, 1);
    props?.onChangeSelected && props.onChangeSelected(tmp);
  };

  const handleDelaySearch = (newValue?: string) => {
    newValue && value !== newValue && props.onFetchData && props.onFetchData(newValue);
  };

  return (
    <div className="form-group mb-2">
      <Label required={props?.required}>{props?.title}</Label>
      <span className="position-relative">
        <InputStyled
          placeholder={'FieldAddMembersPlaceholder'}
          value={value}
          disabled={props?.disabled}
          // onChange={debounce((evt, newValue) => onChangeText(newValue), 1000)}
          onChange={onChange}
          className={`${props?.disabled ? 'disabled' : ''}`}
        />
        {/* <button onClick={handleSearch}>Search</button> */}
        {showData && (
          <WrapperList
            position={props?.position}
            fetching={props.fetching}
            dataFetch={props.dataFetch}
            ref={dataRef}
          >
            {props?.fetching || !fetchList?.length ? (
              <Text variant="smallPlus" className="text-center d-block mt-5 font-weight-bold">
                {props.fetching ? 'Loading...' : ''}
              </Text>
            ) : (
              (fetchList ?? []).map((user: CustomUser, index) => (
                <ItemList
                  joined={user.joined}
                  onClick={() => !user.joined && handleSelect(user)}
                  key={user?.id}
                >
                  <Stack horizontal verticalAlign="center">
                    <Persona
                      size={PersonaSize.size32}
                      imageAlt={user?.profileImage ?? 'Image'}
                      imageUrl={user?.profileImage ?? DefaultUserAvatar}
                      styles={{ root: { maxWidth: 36 } }}
                    />
                    <Stack>
                      <Text variant="smallPlus" className="font-weight-bold text-nowrap">
                        {user?.fullName}
                        {user.joined ? `(${props?.textAdded ?? 'joined'})` : ''}
                      </Text>
                      <Text variant="small">{user?.email}</Text>
                    </Stack>
                  </Stack>
                </ItemList>
              ))
            )}
          </WrapperList>
        )}
      </span>
      <Stack>
        <Row className="ml-0">
          {(props.dataSelected ?? []).map((user: User, index: number) => (
            <StackItemList key={user?.id} horizontal verticalAlign="center">
              <Persona
                size={PersonaSize.size24}
                imageAlt={user?.profileImage ?? 'Image'}
                imageUrl={user?.profileImage ?? DefaultUserAvatar}
                styles={{ root: { maxWidth: 28, marginLeft: 5 } }}
              />
              <Text variant="smallPlus" className="font-weight-bold">
                {user?.fullName}
              </Text>
              <DeleteIcon onClick={() => handleDeleteFile(index)} iconName="Cancel" />
            </StackItemList>
          ))}
        </Row>
      </Stack>
    </div>
  );
};

export default PickerUI;

const InputStyled = styled(TextField)`
  background: #ffffff;
  border: 1px solid rgba(157, 157, 157, 0.5);
  box-sizing: border-box;
  border-radius: 3px;
  font-size: 13px;
  letter-spacing: 0.05em;
  width: 100%;
  padding: 5px 12px;

  &::placeholder {
    color: #464545;
  }
  &:focus,
  &:hover {
    outline: none !important;
    border: 1px solid #0873ba;
    box-shadow: 0px 2px 10px rgba(8, 115, 186, 0.3);
    & + i {
      display: block;
    }
  }
  &.disabled {
    background-color: #f0efef;
    cursor: not-allowed;
    input {
      background-color: #f0efef;
      cursor: not-allowed;
    }
  }
  & div,
  input {
    padding: 0 !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    &::after {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }
`;
const WrapperList = styled.ul`
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fff;
  list-style: none;
  padding: 0;
  position: absolute;
  top: ${(props: UIProps) => props.position === 'left' && '0'};
  right: ${(props: UIProps) => props.position === 'left' && '0'};
  bottom: ${(props: UIProps) => props.position !== 'left' && '0'};
  left: ${(props: UIProps) => props.position !== 'left' && '0'};
  height: ${(props: UIProps) =>
    props?.fetching || props?.dataFetch?.length === 0 ? '10rem' : 'unset'};
  width: 20rem;
  max-height: 20rem;
  max-width: 30rem;
  text-overflow: ellipsis;
  overflow-y: scroll;
  z-index: 99;
  margin-bottom: 0;
`;
const ItemList = styled.li`
  padding: 3px 10px;
  border-bottom: 1px solid #c8ced3;
  cursor: ${(props: CustomUser) => (props.joined ? 'not-allowed' : 'pointer')};
  background-color: ${(props: CustomUser) => (props.joined ? '#eee' : 'transparent')};
  &:hover {
    background-color: #eee;
  }
`;
const StackItemList = styled(Stack)`
  padding: 5px 10px 5px 0;
  display: inline-flex;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #eee;
    i {
      display: block !important;
    }
  }
`;
const DeleteIcon = styled(Icon)`
  cursor: pointer;
  font-size: 8px;
  position: absolute;
  top: 0;
  right: 50%;
  z-index: 99;
  font-weight: bolder;
  padding: 3px 4px;
  background-color: #fff;
  border-radius: 50%;
  display: none;
  &:hover {
    display: block;
  }
`;
