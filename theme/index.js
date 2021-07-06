import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const global = {
  body: {
    backgroundColor: colors.grey[100],
    overflowY: 'scroll',
  },
};

const theme = {
  props: {
    MuiTextField: {
      variant: 'outlined'
    }
  },
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: key => `@media (min-width:${values[key]}px)`,
  },
  palette: {
  },
  overrides: {
    MuiSkeleton: {
      text: {
        display: 'inline-block'
      }
    },
    MuiCssBaseline: {
      '@global': global
    },
  },
};

export default createMuiTheme(theme);
