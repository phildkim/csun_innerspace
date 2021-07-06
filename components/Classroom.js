import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  LinearProgress,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useState } from 'react';
import LazyCardGrid from './LazyCardGrid';
import Link from 'next/link';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  card: { height: 160 },
  buttonCenter: { textAlign: 'center' },
  progress: {
    position: 'absolute',
    width: '80%'
  }
}));

function StudentCard({ data }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  return (
    <Card className={ classes.card }>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" align="center">{ data.fullname }</Typography>
          <Typography variant="body2" color="textSecondary" align="center" component="p">
            Programs completed: { data.complete || 0 }<br />
            Last online: { moment(data.lastOnline).fromNow() }<br />
          </Typography>
        </CardContent>
        <div className={ classes.buttonCenter }>
          <Link shallow href={ `/student/${data._id}` }>
            <Button onClick={ () => setLoading(true) }
              className={ classes.button }
              variant="contained"
              color="default"
              type="button">Collect
              { loading && <LinearProgress className={ classes.progress } /> }
            </Button>
          </Link>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default function Classroom(props) {
  const classes = useStyles();
  return <>
    <LazyCardGrid
      API="/classroom"
      cardClass={ classes.card }
      renderItem={ data => <StudentCard data={ data } /> }
    />
  </>
};
