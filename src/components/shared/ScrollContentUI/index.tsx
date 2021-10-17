import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Label, Stack } from 'office-ui-fabric-react';
import LoadingUI from '../LoadingUI';
import { IQueryParams } from 'models/shared';
import './index.scss';

type UIProps = {
  listItems: any[];
  RenderItems: Function;
  onBottom?: boolean;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  fieldQuery?: string;
  queryParams?: IQueryParams;
  amount: number;
  FieldChange?: Function;
  isLoading?: boolean;
};

const ScrollContentUI = (props: UIProps) => {
  useEffect(() => {}, [props.queryParams]);
  const [hasMore, setHasMore] = useState(true);
  const NextRecord = () => {
    if (props.amount === 0 || props.listItems?.length >= props.amount) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        props.FieldChange &&
          props.FieldChange(props.fieldQuery ?? 'queryParams', {
            ...props.queryParams,
            take: (props.queryParams?.take ?? 0) + 10,
          });
      }, 1000);
    }
  };
  const EndMessage = () => {
    return (
      <Label className={`${props.onBottom && 'nate-team-sub'}`} style={{ textAlign: 'center', margin: 0 }}>
        SawAll
      </Label>
    );
  };
  const Loader = () => {
    if (props.amount > props.listItems.length) {
      return <LoadingUI />;
    } else if (props.listItems.length === 0) {
      return (
        <Label className={`${props.onBottom && 'nate-team-sub'}`} style={{ textAlign: 'center' }}>
          NoRecord
        </Label>
      );
    }
  };
  return props.isLoading !== true ? (
    <Stack className={`${props.onBottom && 'nate-team-page'}`}>
      <InfiniteScroll
        dataLength={props.listItems?.length ?? 0}
        next={NextRecord}
        hasMore={hasMore}
        style={{
          width: props.width,
          minWidth: props.minWidth,
          maxWidth: props.maxWidth,
          height: props.height ?? 'calc(100vh - 240px)',
          minHeight: props.minHeight,
          maxHeight: props.maxHeight,
          overflowX: 'hidden',
          overflowY: 'scroll',
        }}
        endMessage={props.onBottom && EndMessage()}
        loader={Loader()}
      >
        <Stack className={`${props.onBottom && 'nate-team-sub'}`}>{props.RenderItems()}</Stack>
      </InfiniteScroll>
    </Stack>
  ) : (
    <LoadingUI />
  );
};

export default ScrollContentUI;
