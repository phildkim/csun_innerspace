import {
  Box,
  Typography
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Programs } from '@/components';
import { useJWT } from '@/components/hooks';

export default function ProgramsIndex() {
  const user = useJWT();
  return <>
    <Box m={ 4 } width="100%">
      <Typography variant="h4" align="center">
        { user ? `${user.fullname}'s Programs` : <Skeleton m={ 2 } width={ 200 } /> }
      </Typography>
      <Box p={ [2, 3, 4] }>
        <Programs />
      </Box>
    </Box>
  </>;
};
