import React, { useState } from 'react';
import { Dropdown, IDropdownOption, PrimaryButton, SearchBox, Stack } from 'office-ui-fabric-react';
import { IQueryParams } from 'models/shared';

interface UIProps {
  fieldQuery?: string;
  queryParams: IQueryParams;
  FieldChange: (fieldName: string, fieldValue?: any) => void;
  filterOptions: IDropdownOption[];
  filterKey: string;
}

const SearchBoxUI = (props: UIProps) => {
  const [filterValue, setFilterValue] = useState('');
  return (
    <Stack horizontal tokens={{ childrenGap: 20 }}>
      <Dropdown
        styles={{ root: { width: '20%' } }}
        placeholder="Filter"
        options={props.filterOptions}
        onChange={(e, option) => {
          let queryParams = {
            skip: props.queryParams.skip,
            take: props.queryParams.take,
          };
          props.FieldChange('filterKey', option?.key);
          let filterParams = {
            ...queryParams,
            [option?.key!]: filterValue ?? '',
          };
          props.FieldChange(props.fieldQuery ?? 'queryParams', filterParams);
        }}
      />

      <SearchBox
        placeholder="Search"
        styles={{ root: { width: '60%' } }}
        onSearch={value => {
          setFilterValue(value!.trim());
          if (props.filterKey) {
            let filterParams = {
              ...props.queryParams,
              [props.filterKey]: value?.trim(),
            };
            props.FieldChange(props.fieldQuery ?? 'queryParams', filterParams);
          }
        }}
        onClear={() => {
          setFilterValue('');
          if (props.filterKey) {
            let filterParams = {
              ...props.queryParams,
              [props.filterKey]: '',
            };
            props.FieldChange(props.fieldQuery ?? 'queryParams', filterParams);
          }
        }}
      />
      <PrimaryButton
        text={'Search'}
        iconProps={{ iconName: 'Search' }}
        onClick={() => {}}
        styles={{ root: { width: '10%' } }}
      />
    </Stack>
  );
};

export default SearchBoxUI;
