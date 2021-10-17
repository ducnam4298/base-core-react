import React from 'react';
import { FormikValues } from 'formik';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react';
import { dateConverter } from 'constant/dateConverter';
import { IFormControl } from 'models/form';
import { ErrorMessageUI } from 'components/templates';
import { TextFieldStyles } from '../TextFieldUI';

interface UIProps {
  formik: FormikValues;
  control: IFormControl;
  value?: Date;
  language?: 'en' | 'vn';
  minDate?: Date;
  maxDate?: Date;
  onChangeDate?: (date: Date | null | undefined) => void;
  isRequired?: boolean;
  errorMessage?: (fieldName: string) => string | undefined;
}

const DatePickerUI = (props: UIProps) => {
  const {
    formik,
    control,
    value,
    language,
    minDate,
    maxDate,
    onChangeDate,
    isRequired,
    errorMessage,
  } = props;
  const onFormatDate = (date?: Date | null) => {
    return dateConverter.formatDate(date, 'dd/MM/yyyy');
  };
  return (
    <>
      <DatePicker
        {...formik.getFieldProps(control?.id)}
        {...formik.getFieldMeta(control?.id)}
        key={'date-picker' + control.id}
        id={'date-picker' + control.id}
        strings={language === 'vn' ? datePickerVnStrings : datePickerEnStrings}
        onSelectDate={onChangeDate}
        textField={{ styles: TextFieldStyles }}
        value={value}
        label={control.title}
        firstDayOfWeek={DayOfWeek.Monday}
        firstWeekOfYear={1}
        formatDate={onFormatDate}
        showMonthPickerAsOverlay={true}
        placeholder={control.placeholder}
        minDate={minDate}
        maxDate={maxDate}
        isRequired={isRequired ?? false}
      />
      {errorMessage && <ErrorMessageUI message={errorMessage(control.id)} />}
    </>
  );
};

const datePickerVnStrings: IDatePickerStrings = {
  months: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  shortMonths: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
  days: ['2', '3', '4', '5', '6', '7', 'CN'],
  shortDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  goToToday: 'Hôm nay',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Tháng trước',
  nextMonthAriaLabel: 'Tháng tới',
  prevYearAriaLabel: 'Năm trước',
  nextYearAriaLabel: 'Năm tới',
  prevYearRangeAriaLabel: 'Khoảng năm trước',
  nextYearRangeAriaLabel: 'Khoảng năm tới',
  closeButtonAriaLabel: 'Đóng',
  monthPickerHeaderAriaLabel: '{0}, Chuyển năm',
  yearPickerHeaderAriaLabel: '{0}, Chuyển tháng',
  isRequiredErrorMessage: 'Đây là trường bắt buộc',
  invalidInputErrorMessage: 'Đây là trường bắt buộc',
  isOutOfBoundsErrorMessage: 'Đây là trường bắt buộc',
};

const datePickerEnStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['2', '3', '4', '5', '6', '7', 'CN'],
  shortDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  goToToday: 'To Day',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Last Month',
  nextMonthAriaLabel: 'Next Month',
  prevYearAriaLabel: 'Last Year',
  nextYearAriaLabel: 'Next Year',
  prevYearRangeAriaLabel: 'About A Year Go',
  nextYearRangeAriaLabel: 'About Next Year',
  closeButtonAriaLabel: 'Close',
  monthPickerHeaderAriaLabel: '{0}, Next Year',
  yearPickerHeaderAriaLabel: '{0}, Next Month',
  isRequiredErrorMessage: 'Field is Required',
  invalidInputErrorMessage: 'Field is Required',
  isOutOfBoundsErrorMessage: 'Field is Required',
};
export default DatePickerUI;
