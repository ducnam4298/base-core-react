import React from 'react';
import { connect } from 'react-redux';
import universal from 'react-universal-component';
import { NotFoundUI, LoadingUI } from 'components/shared';

type UIProps = {
  page: string;
  isLoading: boolean;
};

const Content = (props: UIProps) => {
  return <UniversalComponent key={"universal"} page={props.page} isLoading={props.isLoading} />;
};

const UniversalComponent = universal((props: UIProps) => import(`./${props.page}`), {
  minDelay: 1000,
  chunkName: props => props.page,
  loading: () => <LoadingUI />,
  error: () => <NotFoundUI />,
});

const mapStateToProps = ({ page, ...state }) => ({
  page,
  isLoading: state.ContextState.loading,
});

export default connect(mapStateToProps)(Content);
