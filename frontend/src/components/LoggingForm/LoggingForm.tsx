import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { InputField } from '../InputField/InputField';
import { LoggingFormBox } from '../LoggingFormBox';
import { InputFieldConsts } from '../../constants/';

const LoggingForm = () => {
  return (
    <form>
      <LoggingFormBox>
        <Typography variant='h4' component='h2'>
          {InputFieldConsts.TITLE}
        </Typography>

        <InputField
          id='email'
          type='email'
          label={InputFieldConsts.LOGIN_EMAIL}
        />

        <InputField
          id='password'
          type='password'
          label={InputFieldConsts.LOGIN_PASSWORD}
        />

        <Button variant='outlined' type='submit'>
          {InputFieldConsts.TITLE}
        </Button>
      </LoggingFormBox>
    </form>
  );
};

export { LoggingForm };
