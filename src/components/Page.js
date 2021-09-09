import { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const Page = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
