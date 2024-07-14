import { useState } from 'react';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { InputField } from '../InputField';
import { LoggingFormBox } from '../LoggingFormBox';
import { AuthFormConsts, EMAIl_REG_EXP } from '../../constants';

type TAuthMode = 'signin' | 'signup';

type TAuthFormValues = {
  email: string;
  password: string;
  repassword?: string;
};

const LoggingForm = () => {
  const [authMode, setAuthMode] = useState<TAuthMode>('signin');

  const form = useForm<TAuthFormValues>({
    defaultValues: {
      email: '',
      password: '',
      repassword: ''
    },
    mode: 'onSubmit'
  });

  const { handleSubmit, formState, setError, reset, control } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: TAuthFormValues) => {
    if (authMode === 'signup' && data.password !== data.repassword) {
      setError('repassword', {
        type: 'manual',
        message: AuthFormConsts.PASSWORD_NOT_MATCH
      });
      return;
    }

    console.log(data);
  };

  const onError = (errors: FieldErrors<TAuthFormValues>) => {
    console.log('Form errors', errors)
  };

  const onChangeMode = () => {
    reset();
    setAuthMode(prev => prev === 'signin' ? 'signup' : 'signin');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate >
      <LoggingFormBox>
        <Typography variant='h4' component='h2'>
          {authMode === 'signin' ? AuthFormConsts.SIGN_IN_TITLE : AuthFormConsts.SIGN_UP_TITLE}
        </Typography>

        <Controller
          control={control}
          name='email'
          rules={{
            required: {
              value: true,
              message: AuthFormConsts.EMAIL_REQUIRED
            },
            pattern: {
              value: EMAIl_REG_EXP,
              message: AuthFormConsts.EMAIL_INVALID
            }
          }}
          render={({ field }) => (
            <InputField
              {...field}
              id='email'
              type='email'
              errors={errors.email?.message}
              label={AuthFormConsts.EMAIL}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          rules={{
            required: {
              value: true,
              message: AuthFormConsts.PASSWORD_REQUIRED
            },
            minLength: {
              value: 6,
              message: AuthFormConsts.PASSWORD_MIN_LENGTH
            }
          }}
          render={({ field }) => (
            <InputField
              {...field}
              id='password'
              label={AuthFormConsts.PASSWORD}
              type='password'
              errors={errors.password?.message}
            />
          )}
        />

        {authMode === 'signup' && (
          <Controller
            control={control}
            name='repassword'
            rules={{
              required: {
                value: true,
                message: AuthFormConsts.PASSWORD_REQUIRED
              },
              minLength: {
                value: 6,
                message: AuthFormConsts.PASSWORD_MIN_LENGTH
              }
            }}
            render={({ field }) => (
              <InputField
                {...field}
                id='repassword'
                label={AuthFormConsts.CONFIRM_PASSWORD}
                type='password'
                errors={errors.repassword?.message}
              />
            )}
          />
        )}

        <Button variant='outlined' type='submit' disabled={isSubmitting}>
          {authMode === 'signin' ? AuthFormConsts.SIGN_IN_TITLE : AuthFormConsts.SIGN_UP_TITLE}
        </Button>

        <Button
          component="button"
          variant="text"
          onClick={onChangeMode}
          sx={{
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'underline',
              outline: 'none'
            },
            '&:focus': {
              textDecoration: 'underline',
              outline: 'none'
            },
          }}
        >
          {authMode === 'signin' ? AuthFormConsts.SIGN_IN_QUESTION : AuthFormConsts.SIGN_UP_QUESTION}
        </Button>
      </LoggingFormBox>
    </form>
  );
};

export { LoggingForm };
