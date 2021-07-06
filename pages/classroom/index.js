import {
  Box,
  Typography
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Classroom } from '@/components';
import { useJWT } from '@/components/hooks';

export default function ClassroomIndex() {
  const user = useJWT();
  return <>
    <Box m={ 4 } width="100%">
      <Typography variant="h4" align="center">
        { user ? `${user.fullname}'s Classroom` : <Skeleton m={ 2 } width={ 200 } /> }
      </Typography>
      <Box p={ 2 }>
        <Classroom />
      </Box>
    </Box>
  </>;
};
