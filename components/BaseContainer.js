import {
  AppBar,
  Button,
  Container,
  makeStyles,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core';
import { useState, useCallback } from 'react';
import { AccountCircle } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useJWT } from './hooks';
import LoginModal from './LoginModal';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: `
    @media(min - width: 576px) and(max - width: 767.98px) {}
    @media (min-width: 768px) and (max-width: 991.98px) {}
    @media (min-width: 992px) and (max-width: 1199.98px) {}
    @media (min-width: 1200px) {}
  `,
  paper: {
    display: 'flex',
    minHeight: '90vh',
    alignItems: 'stretch',
    backgroundColor: '#f8f8f8',
    marginBottom: 24
  },
  title: {
    padding: 6,
    fontSize: 28,
    fontFamily: '"Pacifico", cursive',
    userSelect: 'none',
    color: 'white',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  spacer: {
    flexGrow: 1,
  },
  btnText: {
    ...theme.typography.button,
    padding: theme.spacing(1),
  }
}));

const sleep = () => new Promise((resolve) => {
  setTimeout(() => { resolve(); }, 1000);
});

export default function BaseContainer(props) {
  const classes = useStyles();
  const router = useRouter();
  const user = useJWT();

  const [cookies, deleteCookie] = useCookies();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    setShowModal(!showModal);
  }, []);

  const handleLogout = useCallback((e) => {
    e.preventDefault();
    deleteCookie('jwt');
    router.push('/home');
  }, []);

  return (
    <Container className={ classes.root } { ...props } maxWidth="lg">
      <LoginModal open={ showModal } onClose={ () => closeModal() } />
      <AppBar position="sticky">
        <Toolbar>
          <Link href="/home">
            <a onClick={ handleLogout }>
              <Typography className={ classes.title }>Innerspace</Typography>
            </a>
          </Link>
          <div className={ classes.spacer } />
            <pre>{ ` USER: ${user}` }</pre>
          <div className={ classes.spacer } />
          { !user && <>
            <Button type="submit" color="inherit" onClick={ handleLogin }>Login</Button>
            <AccountCircle />
          </> }
          { user && <>
            <div className={ classes.btnText }>{ user.fullname }</div>
            <AccountCircle />
            <Button type="submit" color="inherit" onClick={ handleLogout }>Logout</Button>
          </> }
        </Toolbar>
      </AppBar>
      <Paper className={ classes.paper } square elevation={ 2 } >
        { props.children }
      </Paper>
    </Container>
  );
};
