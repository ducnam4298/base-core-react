import React from 'react';
import { Col, Row } from 'reactstrap';
import {
  DatePicker,
  Dropdown,
  PrimaryButton,
  Stack,
  TextField,
  SearchBox,
  IDropdownOption,
  DayOfWeek,
  IDatePickerStrings,
} from 'office-ui-fabric-react';

export enum TypeFilter {
  DatePicker,
  Dropdown,
  SearchBox,
  DropSearch,
}

export interface IFilterOptions {
  key?: string;
  typeFilter: TypeFilter;
  label?: string;
  placeHolder?: string;
  ariaLabel?: string;
  filterSearchOptions?: IDropdownOption[];
  filterKeyName?: string;
  filterKey?: string;
  lg: string;
  md: string;
  sm: string;
  /**
   * DatePicker
   */
  firstDayOfWeek?: DayOfWeek;
  strings?: IDatePickerStrings;
  minDate?: Date;
  maxDate?: Date;
  onFormatDate?: (date?: Date) => string;
  selectedDate?: Date;
  onSelectDate?: (date?: Date | null) => void;
  /**
   * Dropdown
   */
  disabled?: boolean;
  selectedKeyDropdown?: string | number | string[] | number[] | null;
  optionsDropdown?: IDropdownOption[];
  onDropdownChange?: (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => void;
  /**
   * SearchBox
   */
  onSearchChange?: (event?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => void;
  /**
   * DropSearch
   */
  fieldNameDropdown?: string;
  defaultSelectedKeyDropSearch?: string | number | string[] | number[] | null;
  optionsDropSearch?: IDropdownOption[];
  fieldNameSearch?: string;
  onDropSearchChange?: (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => void;
  onTextSearch?: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void;
}

interface UIProps {
  filterOptions: IFilterOptions[];
  textButton?: string;
  ActionButton: () => void;
}

const FilterItemsUI = (props: UIProps) => {
  return (
    <Row xs="1" sm="2" md="3" lg="4">
      {props.filterOptions.map(filterOption => {
        if (filterOption.typeFilter === TypeFilter.DatePicker) {
          return (
            <Col sm={filterOption.sm} md={filterOption.md} lg={filterOption.lg}>
              <DatePicker
                key={filterOption.key ?? 'date-picker'}
                id={filterOption.key ?? 'date-picker'}
                styles={{ root: { marginBottom: 10 } }}
                style={{ whiteSpace: 'nowrap' }}
                label={filterOption.label}
                firstDayOfWeek={filterOption.firstDayOfWeek ?? DayOfWeek.Monday}
                strings={filterOption.strings}
                isMonthPickerVisible={true}
                showMonthPickerAsOverlay={true}
                minDate={filterOption.minDate ?? new Date()}
                maxDate={filterOption.maxDate}
                formatDate={filterOption.onFormatDate}
                placeholder={filterOption.placeHolder}
                ariaLabel={filterOption.ariaLabel}
                value={filterOption.selectedDate ?? new Date()}
                onSelectDate={date => {
                  if (filterOption.onSelectDate) {
                    filterOption.onSelectDate(date);
                  }
                }}
              />
            </Col>
          );
        } else if (filterOption.typeFilter === TypeFilter.Dropdown) {
          return (
            <Col sm={filterOption.sm} md={filterOption.md} lg={filterOption.lg}>
              <Dropdown
                key={filterOption.key ?? 'drop-down'}
                id={filterOption.key ?? 'drop-down'}
                disabled={filterOption.disabled ?? false}
                styles={{ root: { marginBottom: 10 } }}
                style={{ whiteSpace: 'nowrap' }}
                label={filterOption.label}
                placeholder={filterOption.placeHolder}
                selectedKey={filterOption.selectedKeyDropdown}
                options={filterOption.optionsDropdown ?? []}
                onChange={(e, option, index) => {
                  if (option && filterOption.onDropdownChange) {
                    filterOption.onDropdownChange(e, option, index);
                  }
                }}
              />
            </Col>
          );
        } else if (filterOption.typeFilter === TypeFilter.SearchBox) {
          return (
            <Col sm={filterOption.sm} md={filterOption.md} lg={filterOption.lg}>
              <SearchBox
                key={filterOption.key ?? 'search-box'}
                id={filterOption.key ?? 'search-box'}
                styles={{ root: { marginBottom: 10 } }}
                title={filterOption.label}
                placeholder={filterOption.placeHolder}
                onChange={(e, value) => {
                  if (filterOption.onSearchChange) {
                    filterOption.onSearchChange(e, value);
                  }
                }}
              />
            </Col>
          );
        } else if (filterOption.typeFilter === TypeFilter.DropSearch) {
          return (
            <Col sm={filterOption.sm} md={filterOption.md} lg={filterOption.lg}>
              <Stack horizontal>
                <Dropdown
                  key={filterOption.key ?? 'drop-down-picker'}
                  id={filterOption.key ?? 'drop-down-picker'}
                  styles={{
                    title: { borderRight: 'none', borderRadius: 0 },
                  }}
                  label={filterOption.label}
                  placeholder={filterOption.placeHolder}
                  defaultSelectedKey={filterOption.defaultSelectedKeyDropSearch}
                  options={filterOption.optionsDropSearch ?? []}
                  required={false}
                  onChange={(e, option, index) => {
                    if (filterOption.onDropSearchChange && filterOption.filterKeyName) {
                      filterOption.onDropSearchChange(e, option, index);
                    }
                  }}
                />
                <TextField
                  key={filterOption.key ?? 'text-field-input'}
                  id={filterOption.key ?? 'text-field-input'}
                  styles={{
                    fieldGroup: {
                      borderLeft: 'none',
                      borderRadius: 0,
                    },
                    root: { marginTop: 'auto', width: '100%' },
                  }}
                  iconProps={{ iconName: 'none' }}
                  placeholder={filterOption.placeHolder}
                  onChange={(e, value) => {
                    if (filterOption.onTextSearch && filterOption.filterKeyName) {
                      filterOption.onTextSearch(e, value);
                    }
                  }}
                />
              </Stack>
            </Col>
          );
        } else return <></>;
      })}
      <Col sm="12" md="6" lg="2">
        <PrimaryButton
          key={'button-action'}
          id={'button-action'}
          style={{ whiteSpace: 'nowrap' }}
          text={props.textButton ?? 'Tìm kiếm'}
          onClick={() => props.ActionButton()}
        />
      </Col>
    </Row>
  );
};

export default FilterItemsUI;
