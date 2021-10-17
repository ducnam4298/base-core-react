import { makeStyles } from '@material-ui/core';

const drawerWidth = 210;
const drawerHeight = 65;
export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      backgroundColor: '#ffffff',
      height: '100vh',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      position: 'absolute',
      width: drawerWidth,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      ...theme.mixins.toolbar,
    },
    toolbarMenu: {
      marginTop: drawerHeight,
      marginBottom: '1rem',
      overflow: 'hidden auto',
    },
    avatar: { height: 30, width: 30, backgroundColor: '#3699ff' },
    appBar: {
      height: drawerHeight,
      color: '#0078d4',
      backgroundColor: '#ffffff',
      boxShadow: 'none !important',
      borderBottom: '1px solid',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      height: drawerHeight,
      color: '#0078d4',
      backgroundColor: '#ffffff',
      boxShadow: 'none !important',
      borderBottom: '1px solid',
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      overflow: 'hidden',
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      backgroundColor: 'revert',
      border: 'none !important',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      border: 'none !important',
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    footer: {
      position: 'fixed',
      bottom: 0,
      width: drawerWidth,
      backgroundColor: '#0078d4',
      borderRight: '1px solid #0000001f',
    },
  }),
  { index: 1 }
);
