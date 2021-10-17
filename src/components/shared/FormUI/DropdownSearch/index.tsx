import React, { useState } from 'react';
import { Dropdown, SearchBox, IDropdownOption, Label, Stack } from 'office-ui-fabric-react';
// import { debounce } from 'lodash';

interface DropdownSearchProps {
  required?: boolean;
  placeholder?: string;
  label?: string;
  id?: string;
  options?: IDropdownOption[];
  selectedKey?: string | number | string[] | number[] | null;
  errorMessage?: string;
  onChange?: (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption | undefined,
    index?: number | undefined
  ) => void;
  onSearchDropdown?: (text?: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

const DropdownSearch = (props: DropdownSearchProps) => {
  const {
    required,
    placeholder,
    label,
    id,
    selectedKey,
    options,
    errorMessage,
    onChange,
    onSearchDropdown,
    loading,
  } = props;

  const [value, setValue] = useState('');

  // const delayedQuery = useCallback(
  //   debounce((value: string) => {
  //     onSearchDropdown && onSearchDropdown(value);
  //   }, 500),
  //   []
  // );

  const onChangeText = (evt?: any, newValue?: string) => {
    if ((newValue && newValue.length >= 3) || (value && !newValue)) {
      // delayedQuery(newValue ?? '');
    }
    setValue(newValue ?? '');
  };

  return (
    <div className="dropdown-search">
      <Label required={required}>{label}</Label>
      <Stack horizontal verticalAlign="center" className="mb-3">
        <SearchBox
          styles={{
            root: {
              maxWidth: '100%',
              overflowX: 'auto',
              // marginRight: '5px',
              flexGrow: 1,
            },
          }}
          placeholder={'Filter'}
          underlined={true}
          iconProps={{
            iconName: 'Filter',
          }}
          value={value}
          disabled={props?.disabled ?? loading}
          onChange={onChangeText}
          onClear={() => onSearchDropdown && onSearchDropdown('')}
        />
        {/* <DefaultButton onClick={handleSearch} text={I18n.t('Search')} /> */}
      </Stack>
      <Dropdown
        required={required}
        placeholder={loading ? 'LoadingEllipsis' : placeholder}
        label={label}
        id={id}
        options={options ?? []}
        selectedKey={selectedKey}
        errorMessage={errorMessage}
        onChange={onChange}
        style={{}}
        disabled={props?.disabled ?? loading}
        styles={{
          callout: {
            maxHeight: 400,
            overflowY: 'scroll',
          },
        }}
      />
    </div>
  );
};

export default DropdownSearch;
