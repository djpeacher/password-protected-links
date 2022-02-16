import React, { useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Link, Container, Typography } from '@material-ui/core';
import countapi from 'countapi-js';

import Page from '../components/Page';
import LockForm from '../components/LockForm';

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

export default function Lock() {
  useEffect(() => {
    countapi
      .hit('password-protected-links.djpeacher.com', 'index_visits')
      .catch((e) => console.error(e));
  });

  return (
    <RootStyle title="Password Protected Links">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              <span role="img" aria-label="lock">
                🔒
              </span>{' '}
              Password Protected Links
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Locking a link generates a new password protected link. This new link is the original
              link that has been encrypted with your password. Encryption is done locally and never
              touches a server.
            </Typography>
          </Box>
          <LockForm />
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            This is a toy project and may have some vulnerabilities.
          </Typography>
          <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
            Created by&nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              href="https://www.djpeacher.com/"
              target="_blank"
            >
              Jonathan Peacher
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            <Link
              underline="none"
              variant="subtitle2"
              href="https://github.com/djpeacher/password-protected-links"
              target="_blank"
            >
              View on GitHub
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
