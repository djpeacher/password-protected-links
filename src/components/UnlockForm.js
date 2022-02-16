import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import countapi from 'countapi-js';

const CryptoJS = require('crypto-js');

export default function UnlockForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { link } = useParams();

  const RegisterSchema = Yup.object().shape({
    password: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: ({ password }, { setFieldError }) => {
      try {
        const cipher = decodeURIComponent(escape(window.atob(link)));
        const realLink = CryptoJS.AES.decrypt(cipher, password).toString(CryptoJS.enc.Utf8);
        if (!realLink) {
          setFieldError('password', 'Incorrect password');
        } else {
          countapi
            .hit('password-protected-links.djpeacher.com', 'links_unlocked')
            .then(() => {
              window.location = realLink;
            })
            .catch((e) => {
              console.error(e);
              window.location = realLink;
            });
        }
      } catch {
        alert('Link appears to be corrupted.');
        window.location.reload();
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
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
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Unlock
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
