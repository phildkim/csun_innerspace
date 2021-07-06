import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useAPI } from './hooks';

export default function LazyCardGrid(props) {
  const { data, loading, error } = useAPI(props.API);
  let content = (loading || !data) ?
    Array(props.placeholders || 3).fill().map((_, i) =>
      <Grid item xs={ props.itemWidth || 4 } key={ i }>
        <Skeleton variant="rect" className={ props.cardClass } />
      </Grid>
    ) :
    data.result.map((obj, i) =>
      <Grid item xs={ props.itemWidth || 4 } key={ i }>
        { props.renderItem(obj) }
      </Grid>
    )
  return <>
    <Grid container spacing={ 2 }>
      { content }
    </Grid>
  </>
};
