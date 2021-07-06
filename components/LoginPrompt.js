import {
  Button,
  Card,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Tab,
  Tabs,
  TextField,
  makeStyles
} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import {
  useState,
  useRef,
  useEffect
} from 'react';
import {
  Alert,
  AlertTitle
} from '@material-ui/lab';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import ReCAPTCHA from 'react-google-recaptcha';

const useStyles = makeStyles((theme) => ({
  loginBox: {
    minWidth: 500,
    height: 'max-content'
  },
  formContent: {
    marginTop: 16,
    marginBottom: 16,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    '& .MuiFormControl-root': {
      margin: 8,
    }
  },
  button: {
    margin: 8,
    width: '33%',
    minHeight: '2.5rem'
  },
  buttonCenter: {
    textAlign: 'center',
  },
  progress: {
    position: 'absolute',
    width: '80%'
  },
  alert: {
    padding: 8,
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  recaptcha: {

  }
}));

const sleep = () => new Promise((resolve) => {
  setTimeout(() => { resolve(); }, 1000);
});

export default function LoginPrompt(props) {
  const classes = useStyles();
  const router = useRouter();
  const inputUsername = useRef();
  const inputPassword = useRef();
  const inputFirst = useRef();
  const inputLast = useRef();
  const inputConfirm = useRef();
  const recaptchaRef = useRef();
  const btnSubmit = useRef();

  const [cookies, setCookie] = useCookies();
  const [tab, setTab] = useState(props.initialTab || 'login');
  const [loading, setLoading] = useState(false);



  const [valid, setValid] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [error, setError] = useState('');

  const { open, onClose } = props;

  /* Focus input fields whenever tab changes */
  useEffect(() => {
    if (tab === 'login')
      inputUsername.current.focus();
    if (tab === 'register')
      inputFirst.current.focus();
  }, [tab]);

  function handleTabChange(evt, value) {
    setTab(value);
  };

  async function handleOnChange(evt) {
    evt.preventDefault();
    (!valid) ? setError('') : await sleep();
  };

  async function handleSubmitForm(evt) {
    evt.preventDefault();
    btnSubmit.current.focus();
    setLoading(true);
    try {
      if (tab === 'login')
        await handleLogin();
      if (tab === 'register')
        await handleRegister();
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  async function handleLogin() {
    try {
      const res = await fetch('/api/auth/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          user: inputUsername.current.value,
          pass: inputPassword.current.value
        })
      });
      const { token, usertype, error } = await res.json();
      const redirect = (usertype === 'teacher') ? '/classroom' : '/programs';
      if (res.ok) {
        setCookie('jwt', token, { sameSite: 'lax' });
        router.push(redirect);
        setValid(!valid);
        onClose();
      } else {
        setError(error);
      }
    } catch(err) {
      setError(err);
    }
  };

  async function handleRegister() {
    try {
      const res = await fetch('/api/auth/register', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          name: `${inputFirst.current.value} ${inputLast.current.value}`,
          type: 'student',
          user: `${inputUsername.current.value}`,
          password: `${inputPassword.current.value}`,
          passwordConfirm: `${inputConfirm.current.value}`,
          date: new Date()
        })
      });
      const { token, usertype, error } = await res.json();
      const redirect = (usertype === 'teacher') ? '/classroom' : '/programs';
      if (res.ok) {
        setCookie('jwt', token, { sameSite: 'lax' });
        router.push(redirect);
        setValid(!valid);
        onClose();
      } else {
        setError(error);
      }
    } catch (err) {
      setError(err);
    }
  };

  async function handleCaptcha(token) {
    try {
      const res = await fetch('/api/auth/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ token })
      });
      const { error } = await res.json();
      (!res.ok) ? setError(error) : setCaptcha(!captcha);
    } catch(err) {
      setError(err);
    }
  };

  return (
    <Card elevation={ 5 } className={ classes.loginBox } { ...props }>
      <Tabs centered
        value={ tab }
        onChange={ handleTabChange }
        indicatorColor="primary"
        textColor="primary">
        <Tab label="Login" value="login" />
        <Tab label="Register" value="register" />
      </Tabs>
      <Fade in={ open }>
        <form
          disabled={ open }
          onSubmit={ handleSubmitForm }
          className={ classes.formContent }>
          { tab === 'register' && <>
            <TextField
              required
              label="First name"
              inputRef={ inputFirst }
              disabled={ loading }
              onChange={ handleOnChange }
              autoComplete="given-name" />
            <TextField
              required
              label="Last name"
              inputRef={ inputLast }
              disabled={ loading }
              onChange={ handleOnChange }
              autoComplete="family-name" />
          </> }
          <TextField
            required
            label="Username"
            autoComplete="username"
            inputRef={ inputUsername }
            disabled={ loading }
            onChange={ handleOnChange }
            autoFocus />
          <ShowablePassword
            required
            label="Password"
            id="current-password-field"
            inputRef={ inputPassword }
            disabled={ loading }
            onChange={ handleOnChange }
            autoComplete="current-password" />
          { tab === 'register' && <>
            <ShowablePassword
              required
              label="Confirm password"
              id="new-password-field"
              inputRef={ inputConfirm }
              disabled={ loading }
              onChange={ handleOnChange }
              autoComplete="new-password" />
          </> }
          <div className={ classes.alert }>
            { error === '' ? '' :
              <Alert severity="error">
                <AlertTitle>{ error }</AlertTitle>
              </Alert>
            }
          </div>
          <div className={ classes.buttonCenter }>
            <ReCAPTCHA
              sitekey={ `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}` }
              ref={ recaptchaRef }
              onChange={ handleCaptcha }
              style={ { display: "inline-block" } }
            /><br />
            <Button
              className={ classes.button }
              onClick={ onClose }
              variant="contained"
              color="primary"
              type="button">
              Cancel
            </Button>
            <Button
              ref={ btnSubmit }
              className={ classes.button }
              disabled={ loading }
              variant="contained"
              color="primary"
              type="submit"
              disableElevation>
              { loading ? '' : tab === 'login' ? 'Login' : 'Register' }
              { loading && <LinearProgress className={ classes.progress } /> }
            </Button>
          </div>
        </form>
      </Fade>
    </Card>
  );
}

function ShowablePassword(props) {
  const [showPassword, setShowPassword] = useState(false);
  function handleClick() {
    setShowPassword(!showPassword);
  };
  const adornment = (
    <InputAdornment position="end">
      <IconButton
        disabled={ props.disabled }
        onClick={ handleClick }>
        { showPassword ? <Visibility /> : <VisibilityOff /> }
      </IconButton>
    </InputAdornment>
  );
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={ props.id }>{ props.label }</InputLabel>
      <OutlinedInput
        { ...props }
        type={ showPassword ? 'text' : 'password' }
        endAdornment={ adornment } />
    </FormControl>
  );
};
