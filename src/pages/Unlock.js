import { useParams } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Alert, Box, Container, Typography } from '@material-ui/core';

import Page from '../components/Page';
import UnlockForm from '../components/UnlockForm';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(6, 0)
}));

export default function Unlock() {
  const { link } = useParams();

  let data;
  try {
    data = decodeURIComponent(escape(window.atob(link)));
  } catch {
    data = null;
  }

  return (
    <RootStyle title="Password Protected Links">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              <span role="img" aria-label="lock">
                🔒
              </span>{' '}
              Password Protected Link
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              You will be redirected once you unlock the link.
            </Typography>
          </Box>
          {data && <UnlockForm />}
          {!data && <Alert severity="error">This is a corrupted link.</Alert>}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
