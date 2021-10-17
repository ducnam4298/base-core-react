import React, { useMemo, useCallback } from 'react';
import { Row } from 'reactstrap';
import { DefaultButton, Dropdown, IDropdownOption, PrimaryButton } from 'office-ui-fabric-react';
import './index.scss';

interface UIProps {
  pageSize: number;
  pageNumber: number;
  totalRecords?: number;
  isShowPageInfo?: boolean;
  onChange: Function;
  onChangePageSize?: (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => void;
}

const pageSizeOption = [5, 10, 15, 20];

let options: IDropdownOption[] = [];

options = pageSizeOption.map(val => {
  return {
    key: val,
    text: val + '',
  };
});

const PaginationUI = (props: UIProps) => {
  const { totalRecords, pageNumber, pageSize } = props;

  const totalPages: number = useMemo(() => {
    let records = totalRecords ?? 1;
    let result = records / pageSize;

    if (records % pageSize === 0 && result > 0) {
      return result;
    } else {
      return Math.trunc(result) + 1;
    }
  }, [pageSize, totalRecords]);

  const fromRecords: number = useMemo(() => {
    return pageSize * (pageNumber - 1) + 1;
  }, [pageNumber, pageSize]);

  const toRecords = useMemo(() => {
    return pageSize * pageNumber >= (totalRecords ?? 1) ? totalRecords : pageSize * pageNumber;
  }, [pageSize, pageNumber, totalRecords]);

  const changePageNumber = useCallback(
    (pageNumber: number) => {
      props.onChange(pageSize, pageNumber);
    },
    [pageSize, props]
  );

  // in ra danh sách trang tối đa hiển thị cho chọn 5 trang
  const DisplayPage = useCallback(() => {
    let pages = Array<any>();

    // tạo mảng chỉ gồm 5 giá trị theo pageNumber hiện tại
    for (let i = 1; i <= totalPages; i++) {
      if (
        (pageNumber <= 3 && i <= 5) ||
        (pageNumber > 3 && i > pageNumber - 3 && i < pageNumber + 3) ||
        (pageNumber > totalPages - 3 && i > totalPages - 5)
      )
        pages.push(i);
    }

    return pages.map((page, index) => (
      <li key={index}>
        <PrimaryButton
          className={
            pageNumber === page ? 'active nate-team-button-page-2' : 'nate-team-button-page-2'
          }
          onClick={() => changePageNumber(page)}
        >
          {page}
        </PrimaryButton>
      </li>
    ));
  }, [pageNumber, totalPages, changePageNumber]);

  const returnPaginate = () => {
    if ((totalRecords ?? 0) <= 0) {
      return (
        <div
          style={{
            textAlign: 'center',
            marginTop: 10,
            fontWeight: 500,
            fontSize: '0.8rem',
          }}
        >
          <span title="Tổng bản ghi">
            PaginationNoRecord
          </span>
        </div>
      );
    } else if (totalPages <= 1) {
      return (
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ marginTop: 5, fontWeight: 500, fontSize: '0.8rem' }} title="Tổng bản ghi">
            {`From ${fromRecords} to ${toRecords} in ${totalRecords}`}
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{ fontSize: '0.8rem', fontWeight: 500 }}
              className="pr-3 align-self-center"
            >
              {'Records on Page'}:
            </span>
            <Dropdown onChange={props.onChangePageSize} selectedKey={pageSize} options={options} />
          </div>
        </div>
      );
    } else {
      return (
        <Row
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {props.isShowPageInfo && props.isShowPageInfo === true ? (
            <span
              style={{ marginTop: 5, fontSize: '0.8rem', fontWeight: 500 }}
              title="Tổng bản ghi"
            >
              {`From ${fromRecords} to ${toRecords} in ${totalRecords}`}
            </span>
          ) : (
            <span></span>
          )}

          <ul className="nate-team-pagination">
            <li title="">
              <DefaultButton
                disabled={pageNumber <= 1 ? true : false}
                className="nate-team-button-page"
                onClick={() => changePageNumber(1)}
                iconProps={{ iconName: 'Previous' }}
              />
            </li>
            <li title="Về trang trước đó">
              <DefaultButton
                disabled={pageNumber <= 1 ? true : false}
                className="nate-team-button-page"
                onClick={() => changePageNumber(pageNumber - 1)}
                iconProps={{ iconName: 'Rewind' }}
              />
            </li>
            {DisplayPage()}
            <li title="">
              <DefaultButton
                disabled={pageNumber >= totalPages ? true : false}
                className="nate-team-button-page"
                onClick={() => changePageNumber(pageNumber + 1)}
                iconProps={{ iconName: 'FastForward' }}
              />
            </li>
            <li title="Đi đến trang cuối">
              <DefaultButton
                disabled={pageNumber >= totalPages ? true : false}
                className="nate-team-button-page"
                onClick={() => changePageNumber(totalPages)}
                iconProps={{ iconName: 'Next' }}
              />
            </li>

            <li title="">
              <Dropdown
                className="nate-team-dropdown-pagination"
                onChange={props.onChangePageSize}
                selectedKey={pageSize}
                options={options}
              />
            </li>
          </ul>
        </Row>
      );
    }
  };
  // Trả về paginate phân trang
  return returnPaginate();
};
export default PaginationUI;
