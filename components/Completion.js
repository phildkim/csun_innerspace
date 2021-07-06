import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  colors,
  makeStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useJWT } from './hooks';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '50vh',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: colors.grey[200]
  },
  button: {
    margin: 8,
    width: '33%',
    minHeight: '3.5rem',
    fontSize: 17
  },
}));

export default function Completion(props) {
  const classes = useStyles();
  const router = useRouter();
  const user = useJWT();


  function handleEmotionCompletion(item) {
    if (props.onSelect) props.onSelect(item);
    router.push('/programs', undefined, { shallow: true });
  };

  return (
    <Container maxWidth="lg">
      <Typography component="div" className={ classes.root }>
        <Paper className={ classes.paper }>
          <Image
            src={ `/images/goldstar.png` }
            alt={ `golden star` }
            layout='fixed'
            width={ 150 }
            height={ 150 }
          />
          <Box fontWeight="fontWeightBold" m={ 1 }>
            <Typography variant="h4" component="div">
              Great job checking in today, <strong>{ user.fullname }</strong>!
              <br />
              You&#39;ve earned a <strong>golden star</strong>!
            </Typography>
          </Box>
          <Button
            className={ classes.button }
            onClick={ handleEmotionCompletion.bind(null) }
            variant="contained"
            color="primary"
            type="submit">Return to programs
          </Button>
        </Paper>
      </Typography>
    </Container>
  );
};
