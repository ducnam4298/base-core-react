import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { goHome } from 'routes/Actions';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';

interface Props {
  dispatch: Dispatch;
  signInParams: string;
  goHome: any;
}

const Callback = (props: Props) => {
  // console.log(props);
  // const successCallback = (user: User) => {
  //   // get the user's previous location, passed during signinRedirect()
  //   //const redirectPath = user.state?user.state.path : "/" as string;
  //   props.goHome()
  // }

  // by default userManager gets params from the current route
  // eg. 'localhost:5100/callback#token_id=...&session_state=...
  //                              ------------------------------
  // this doesn't work when using hash history as the first hash messed up the process
  // eg. 'localhost:5100/#/callback#token_id=...&session_state=...
  // need to pass the token manually to signinRedirectCallback function
  // useEffect(() => {
  //   userManager
  //     .signinRedirectCallback(props.signInParams)
  //     .then((user: any) => successCallback(user))
  //     .catch((error: any) => errorCallback(error))
  // })

  return <Spinner size={SpinnerSize.large} style={{ height: '100%' }} />;
};
// const mapStateToProps = (state: ApplicationState) => ({
//   config: state.ConfigState,
//   context: state.ContextState
// })
const mapDispatchToProps = { goHome: goHome };

export default connect(null, mapDispatchToProps)(Callback);
