import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Field } from '../InputField/Field';

import { InputFieldConsts } from '../../constants/constants';

const LoggingForm = () => {
  return (
    <form>
      <Typography variant='h4' component='h2'>
        Sign up
      </Typography>

      <Field type='email' label={InputFieldConsts.LOGIN_EMAIL} />
      <br />
      <Field type='password' label={InputFieldConsts.LOGIN_PASSWORD} />
      <br />
      <Button variant='outlined' type='submit'>
        Sign up
      </Button>
    </form>
  );
};

export { LoggingForm };
