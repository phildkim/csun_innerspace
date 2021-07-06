import { Box } from '@material-ui/core';
import { Collections } from '@/components';
import { useRouter } from 'next/router';
import { useAPI } from '@/components/hooks';

export default function StudentId() {
  const router = useRouter();
  const { query } = router;
  const student = useAPI(`/users/${query.id}`);
  const results = useAPI(`/results/${query.id}`); //query by student id

  if (student.loading || results.loading) {
    return null;
  }
  if (!student.data || !student.data.result) {
    router.push('/404', undefined, { shallow: true });
    return null;
  }

  return <>
    <Box width="100%">
      <Collections
        name={ student.data.result.fullname }
        data={ results.data.result } />
    </Box>
  </>;
}
