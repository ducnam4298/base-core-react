const DateExtension = class {
  getCurrent = () => {
    //    return  moment.now();
  };

  /**
   * Hiển thị khoảng thời gian từ parseData đến hiện tại
   * @param parseData : string: format 0001-01-01T00:00:00+00:00
   */
  timeFromCurrentFromDate = (parseData: string) => {
    let parseDate = new Date(parseData);
    let currentFromDate = new Date();
    let distance = Math.abs(currentFromDate.getTime() - parseDate.getTime());
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if (days === 0 && hours === 0 && minute === 0) return '{justnow}';
    else
      return days === 0
        ? hours === 0
          ? (minute ?? 0) + ` {${minute > 1 ? 'ms' : 'm'}}`
          : (hours ?? 0) + ` {${minute > 1 ? 'hs' : 'h'}}`
        : (days ?? 0) + ` {${minute > 1 ? 'ds' : 'd'}}`;
  };

  // Format date to string format: "yyyy-MM-ddThh:mm:ssZ"
  formatDate = (date: any, format?: string, setTimeZone?: boolean) => {
    if (!format) format = 'yyyy-MM-ddThh:mm:ssZ';
    let dateObj = new Date(date);
    if (setTimeZone) {
      const timeZone = new Date().getTimezoneOffset() / 60;
      dateObj.setHours(dateObj.getHours() + timeZone);
    }
    let year = dateObj.getFullYear();
    if (year === 1 || year === 1970) return '';
    let day = `0${dateObj.getDate()}`.substr(-2);
    let month = `0${dateObj.getMonth() + 1}`.substr(-2);
    let hours = `0${dateObj.getHours()}`.substr(-2);
    let minutes = `0${dateObj.getMinutes()}`.substr(-2);
    let seconds = `0${dateObj.getSeconds()}`.substr(-2);
    let dateFormat = format.replace('yyyy', year.toString());
    dateFormat = dateFormat.replace('MM', month);
    dateFormat = dateFormat.replace('dd', day);
    dateFormat = dateFormat.replace('hh', hours);
    dateFormat = dateFormat.replace('mm', minutes);
    dateFormat = dateFormat.replace('ss', seconds);

    return dateFormat;
  };

  /**
   * lấy số tháng giữa 2 ngày
   * @param startDate định dạng yyyy/MM/dd
   * @param endDate định dạng yyyy/MM/dd
   */
  dateRange = (startDate: any, endDate: any) => {
    let start = startDate.split('/');
    let end = endDate.split('/');
    let startYear = parseInt(start[0]);
    let endYear = parseInt(end[0]);
    let dates = new Array<any>();

    for (let i = startYear; i <= endYear; i++) {
      let endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1;
      let startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
      for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
        let month = j + 1;
        let displayMonth = month < 10 ? '0' + month : month;
        dates.push([i, displayMonth, '01'].join('/'));
      }
    }

    return dates;
  };

  getNameOfMonth = (month: number): string => {
    return 'Tháng ' + month;
  };

  /**
   * Số tuần giữa 2 date
   * @param d1 : Date
   * @param d2 : Date
   */
  weeksBetween = (d1: any, d2: any) => {
    const soTuan = Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    let arrSoTuan = new Array<number>();
    for (let i = 1; i <= soTuan; i++) {
      arrSoTuan.push(i);
    }
    return arrSoTuan;
  };

  /**
   * Số ngày thứ 2 của 1 tháng
   * @param date : yyyy/MM/dd
   */
  getNumMondays = (date: any) => {
    let data = date.split('/');
    let d = new Date(data[0], data[1], data[2]);
    let mondays = new Array<any>();
    d.setMonth(d.getMonth() - 1);
    let month = d.getMonth();
    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
      d.setDate(d.getDate() + 1);
    }
    let i = 1;
    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
      mondays.push({
        num: i,
        day: new Date(d.getTime()),
      });
      i++;
      d.setDate(d.getDate() + 7);
    }

    // let arrMonday = new Array<number>();
    // for (let i = 1; i <= mondays.length; i++) {
    //   arrMonday.push(i);
    // }

    // return arrMonday;
    return mondays;
  };

  /**
   * Lấy ngày đầu tuần của 1 ngày trong tuần
   * @param date
   */
  getMonday = (date: any) => {
    const curr = new Date(date);
    return new Date(curr.setDate(curr.getDate() - curr.getDay()));
  };

  /**
   * Lấy ngày cuối tuần của 1 ngày trong tuần
   * @param date
   */
  getSunday = (date: any) => {
    const curr = new Date(date);
    // return new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
    return new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
  };

  /**
   * Lấy ngày thứ 6 của 1 ngày trong tuần
   * @param date
   */
  getFriday = (date: any) => {
    const curr = new Date(date);
    return new Date(curr.setDate(curr.getDate() - curr.getDay() + 4));
  };

  /**
   * Hiển thị ngày trên form
   *
   */
  showDateForm = (
    createdDate: Date | string,
    modifiedDate?: Date | string,
    formatDate?: string
  ) => {
    let title = '',
      content = '';
    if (
      modifiedDate &&
      this.formatDate(modifiedDate, 'hh:mm, MM/dd/yyyy') !==
        this.formatDate(createdDate, 'hh:mm, MM/dd/yyyy')
    ) {
      title = 'LastModified';
      content = this.formatDate(modifiedDate, formatDate ?? 'hh:mm, MM/dd/yyyy');
    } else {
      title = 'Published';
      content = this.formatDate(createdDate, formatDate ?? 'hh:mm, MM/dd/yyyy');
    }
    return {
      title,
      content,
    };
  };

  excelDateToDate(serial: any, formatDate?: string) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return this.formatDate(
      new Date(
        date_info.getFullYear(),
        date_info.getMonth(),
        date_info.getDate(),
        hours,
        minutes,
        seconds
      ),
      formatDate
    );

    // return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  ConvertLocalDate2Timestamp = (date: Date) => {
    let tmLoc = new Date(date);
    let currentUTC = tmLoc.getTime();
    return Math.floor(currentUTC / 1000);
  };

  getDateFromCurrentDate(diff: number) {
    let currentDate = new Date();

    let x = new Date();
    x.setDate(currentDate.getDate() + diff);
    return x;
  }

  ConvertUTCDateToLocalDate = (selectedDate: Date) => {
    let timeOffset = -(selectedDate.getTimezoneOffset() / 60);
    selectedDate.setHours(selectedDate.getHours() + timeOffset);
    let date: Date = selectedDate as Date;
    return date;
  };

  GetCurrentTime = () => {
    var now = new Date();
    var time = '';
    if (now.getHours() >= 10) {
      if (now.getMinutes() >= 10) {
        time = `${now.getHours()}:${now.getMinutes()}`;
      } else {
        time = `${now.getHours()}:0${now.getMinutes()}`;
      }
    } else {
      if (now.getMinutes() >= 10) {
        time = `0${now.getHours()}:${now.getMinutes()}`;
      } else {
        time = `0${now.getHours()}:0${now.getMinutes()}`;
      }
    }

    return time;
  };
  public extractTime(parseData: any) {
    let parseDate = new Date(parseData);
    let currentDate = new Date();
    let distance = Math.abs(currentDate.getTime() - parseDate.getTime());
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if (days === 0 && hours === 0 && minute === 0) return 'just now';
    else return days === 0 ? (hours === 0 ? minute + ' m' : hours + ' h') : days + ' d';
  }

  public formatDateYMD = (date: any) => {
    let mDate = new Date(date);
    return (
      mDate.getFullYear() +
      '-' +
      `0${mDate.getMonth() + 1}`.substr(-2) +
      '-' +
      `0${mDate.getDate()}`.substr(-2)
    );
  };
  public Epoch2LocalTime = (utcSeconds: number) => {
    let d = new Date();
    let current = d.setUTCSeconds(utcSeconds);
    let time = new Date(current).toTimeString().split(' ')[0].split(':').splice(0, 2).join(':');
    return time;
  };
  public Epoch2LocalDate = (utcSeconds: number) => {
    let d = new Date();
    let current = d.setUTCSeconds(utcSeconds);
    return this.formatDate(current);
  };
  public CurrentUTCTimestamp = () => {
    let tmLoc = new Date();
    let currentUTC = tmLoc.getTime() + tmLoc.getTimezoneOffset() * 1000;
    return Math.floor(currentUTC / 1000);
  };

  public DateUTCTimestamp = (date: any) => {
    let tmLoc = new Date(date);
    let currentUTC = tmLoc.getTime() + tmLoc.getTimezoneOffset() * 1000;
    return Math.floor(currentUTC / 1000);
  };
  public GetDateFromCurrentDate = (diff: number) => {
    let currentDate = new Date();

    let x = new Date();
    x.setDate(currentDate.getDate() + diff);
    return x;
  };
  public GetMondayTimeStamp = () => {
    let currentDate = new Date();
    let day = currentDate.getDay();
    let diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);

    let tmLoc = new Date(currentDate.setDate(diff));
    let currentUTC = tmLoc.getTime() + tmLoc.getTimezoneOffset() * 1000;
    return Math.floor(currentUTC / 1000);
  };
  public GetSundayTimeStamp = () => {
    let currentDate = new Date();
    let day = currentDate.getDay();
    let diff = currentDate.getDate() + 6 - (day === 0 ? 0 : day - 1);
    let tmLoc = new Date(currentDate.setDate(diff));
    let currentUTC = tmLoc.getTime() + tmLoc.getTimezoneOffset() * 1000;
    return Math.floor(currentUTC / 1000);
  };

  public getFirstDayOfMonth = (lastMonth: number = 0) => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    if (month + lastMonth > 12) {
      month = month + lastMonth - 12;
      year++;
    } else if (month + lastMonth < 0) {
      month = 12 + month - lastMonth;
      year--;
    } else {
      month += lastMonth;
    }

    return new Date(year, month);
  };
  public getLastDayOfMonth = (lastMonth: number = 0) => {
    let firstOfNextMonth = this.getFirstDayOfMonth(lastMonth + 1);

    return new Date(firstOfNextMonth.setHours(-1));
  };
  public GetFirstDateOfMonthTimeStamp = (lastMonth: number = 0) => {
    let currentDate = this.getFirstDayOfMonth(lastMonth);
    let diff = 1;
    let tmLoc = new Date(currentDate.setDate(diff));
    let currentUTC = tmLoc.getTime() + tmLoc.getTimezoneOffset() * 1000;
    return Math.floor(currentUTC / 1000);
  };
  public GetLastDateOfMonthTimeStamp = (lastMonth: number = 0) => {
    let date = this.getLastDayOfMonth(lastMonth);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let currentUTC = lastDay.getTime() + lastDay.getTimezoneOffset() * 1000;
    return Math.floor(currentUTC / 1000);
  };
  public GetDateFromString = (date: string) => {
    try {
      let mDate = new Date(date);
      return mDate;
    } catch {
      return '';
    }

    // return `0${mDate.getDate()}`.substr(-2) + '-' + `0${mDate.getMonth() + 1}`.substr(-2) + '-' + + mDate.getFullYear();
  };
};

const dateConverter = new DateExtension();

export { dateConverter };
