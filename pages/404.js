import Link from 'next/link'
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  error: {
    textAlign: 'center',
    paddingLeft: theme.spacing(60)
  }
}));
export default function Custom404Page(props) {
  const classes = useStyles();
  return (
    <div className={ classes.error }>
      <h1>404 - Page Not Found</h1>
      <h2>
        <Link href="/">
          <a style={ { color: 'blue', textDecoration: 'underline' } }>
            Go To Home Page
          </a>
        </Link>
      </h2>
    </div>
  );
};
