import React from 'react';
import {
  DetailsHeader,
  IColumn,
  IDetailsHeaderProps,
  IDropdownOption,
  IRenderFunction,
  // IObjectWithKey,
  ScrollablePane,
  ScrollbarVisibility,
  // Selection,
  SelectionMode,
  ShimmeredDetailsList,
  Sticky,
  StickyPositionType,
} from 'office-ui-fabric-react';
import { IFormContext, IQueryParams } from 'models/shared';
import { PaginationUI } from 'components/templates';
import { DetailHeaderStyles } from './render-grid-header';
import { onRenderRow } from './render-grid-row';

interface UIProps {
  columns: IColumn[];
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => React.ReactNode;
  onRenderFilterColumn?: (column: IColumn) => JSX.Element;
  onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;
  selectionMode?: SelectionMode;
  data: {
    listItems?: any[];
    totalNumber?: number;
  };
  formContext?: IFormContext;
  filterName?: string;
  filterParams?: IQueryParams;
  FieldChange?: (fieldName: string, fieldValue?: any) => void;
}

const ListItemUI = (props: UIProps) => {
  const { onRenderItemColumn, onRenderFilterColumn, onItemInvoked } = props;
  // const onSelectQuestion = useCallback((values?: IObjectWithKey[]) => {
  //   if (values && values?.length >= 0) {
  //     let itemsSelection =
  //       values &&
  //       values.map((item: any): string => {
  //         return item.id;
  //       });
  //     props.FieldChange && props.FieldChange('', itemsSelection);
  //   }
  // }, []);
  // const selection = useMemo(
  //   () =>
  //     new Selection({
  //       onSelectionChanged: () => {
  //         onSelectQuestion(selection.getSelection());
  //       },
  //       selectionMode: SelectionMode.multiple,
  //     }),
  //   [onSelectQuestion]
  // );
  const onChangePage = (pageSize: number, pageNumber: number) => {
    let filterParams = {
      ...props.filterParams,
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
    };
    props.filterName && props.FieldChange && props.FieldChange(props.filterName, filterParams);
  };
  const onChangePageSize = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (props.filterParams) {
      let filterParams = { ...props.filterParams, take: option?.key as number };
      if (filterParams['skip'] < filterParams['take']) {
        filterParams['skip'] = 0;
      } else if (
        filterParams['take'] > props.filterParams['take'] &&
        filterParams['skip'] % 2 === 0 &&
        filterParams['skip'] % 20 !== 0
      ) {
        filterParams['skip'] =
          Math.floor(filterParams['skip'] / filterParams['take']) * filterParams['take'];
      } else if (
        filterParams['take'] > props.filterParams['take'] &&
        filterParams['skip'] % 2 !== 0 &&
        filterParams['skip'] % 20 === 5
      ) {
        filterParams['skip'] -= props.filterParams['take'];
      } else if (
        filterParams['take'] > props.filterParams['take'] &&
        filterParams['skip'] % 2 !== 0 &&
        filterParams['skip'] % 20 === 15
      ) {
        filterParams['skip'] -= filterParams['take'] - props.filterParams['take'];
      }

      props.filterName && props.FieldChange && props.FieldChange(props.filterName, filterParams);
    }
  };
  const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (
    props?: IDetailsHeaderProps
  ) => {
    if (props) {
      let Columns: IColumn[] = [...(props.columns ?? [])];
      Columns = Columns.map(col => {
        return {
          ...col,
          name: col.name,
          styles: DetailHeaderStyles,
        };
      });
      return (
        <Sticky stickyPosition={StickyPositionType.Header} stickyBackgroundColor={'transparent'}>
          <DetailsHeader {...props} columns={Columns} styles={{ root: { paddingTop: 0 } }} />
          <div className="item-wrapper d-flex flex-row">
            {Columns.map((col: IColumn, index: number, array: IColumn[]) => {
              return (
                <div
                  key={col.key}
                  style={{
                    minWidth: (col?.minWidth ?? 0) + 20,
                    width: (props.columns[index].calculatedWidth ?? 0) + 20,
                    background: '#f4f4f4',
                  }}
                >
                  {onRenderFilterColumn && onRenderFilterColumn(col)}
                </div>
              );
            })}
          </div>
        </Sticky>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <div style={{ height: '70vh', position: 'relative' }}>
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <ShimmeredDetailsList
            styles={{ root: { paddingTop: 0 } }}
            enableShimmer={props.formContext?.isLoading}
            items={props.data.listItems ?? []}
            columns={props.columns}
            isHeaderVisible={true}
            onRenderItemColumn={onRenderItemColumn}
            onItemInvoked={onItemInvoked}
            selectionMode={props.selectionMode ?? SelectionMode.none}
            // selection={selection}
            selectionPreservedOnEmptyClick={props.selectionMode ? true : false}
            onRenderDetailsHeader={onRenderDetailsHeader}
            onRenderRow={onRenderRow}
          />
        </ScrollablePane>
      </div>
      {!props.formContext?.isLoading && props.filterParams && (
        <PaginationUI
          isShowPageInfo
          pageSize={props.filterParams.take}
          pageNumber={Math.floor(props.filterParams.skip / props.filterParams.take) + 1}
          totalRecords={props.data.totalNumber ?? 0}
          onChange={onChangePage}
          onChangePageSize={onChangePageSize}
        />
      )}
    </>
  );
};

export default ListItemUI;
