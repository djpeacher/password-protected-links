import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import countapi from 'countapi-js';

import LockedLinkDialog from './LockedLinkDialog';

const CryptoJS = require('crypto-js');

export default function LockForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState();

  const handleOpen = (url) => {
    setUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RegisterSchema = Yup.object().shape({
    link: Yup.string().url('Invalid link!').required('Enter a link to lock!'),
    password: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      link: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: ({ link, password }) => {
      const ciper = CryptoJS.AES.encrypt(link, password).toString();
      const encryptedLink = window.btoa(unescape(encodeURIComponent(ciper)));
      handleOpen(encryptedLink);
      countapi
        .hit('password-protected-links.djpeacher.com', 'links_locked')
        .catch((e) => console.error(e));
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            type="url"
            label="Link"
            {...getFieldProps('link')}
            error={Boolean(touched.link && errors.link)}
            helperText={touched.link && errors.link}
            autoFocus
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText="Short passwords can be brute forced. For secure links, use a strong passphrase."
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Lock
          </LoadingButton>
        </Stack>
      </Form>
      <LockedLinkDialog open={open} url={url} handleClose={handleClose} />
    </FormikProvider>
  );
}
