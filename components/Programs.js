import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  colors,
  makeStyles,
} from '@material-ui/core';
import { useState } from 'react';
import LazyCardGrid from './LazyCardGrid';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  card: {
    padding: theme.spacing(2),
    border: '1px solid #fff',
    backgroundColor: colors.blueGrey[50]
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    '& > *': {
      margin: theme.spacing(3),
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    width: '100%',
    paddingLeft: theme.spacing(18),
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  status: {
    padding: theme.spacing(2),
    margin: '0 auto',
  },
  buttonCenter: { textAlign: 'center' },
  button: {
    margin: 8,
    width: '60%',
    minHeight: '4rem',
    fontSize: 22
  },
  progress: {
    position: 'absolute',
    width: '80%'
  }
}));

function ProgramCard({ data }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  return (
    <Card className={ classes.card }>
      <CardContent>
        <Typography variant="h4" align="center">{ data.title }</Typography>
        <div className={ classes.status }>
          <Typography variant="h6" color="textSecondary" component="div">
            No. of questions: { data.questions.length }<br />
          </Typography>
        </div>
        <Divider />
      </CardContent>
      <div className={ classes.buttonCenter }>
        <Link href={ `/programs/${data._id}` }>
          <Button onClick={ () => setLoading(true) }
            className={ classes.button }
            variant="contained"
            color="primary"
            type="button"
            size="large">Start Program
            { loading && <LinearProgress className={ classes.progress } /> }
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default function Programs() {
  const classes = useStyles();
  return <>
    <div className={ classes.root }>
      <Grid container spacing={ 3 }>
        <Grid item xs>
          <LazyCardGrid
            API="/programs"
            itemWidth={ 6 }
            placeholders={ 2 }
            cardClass={ classes.card }
            renderItem={ data => <ProgramCard data={ data } /> } />
        </Grid>
      </Grid>
    </div>
  </>
};
