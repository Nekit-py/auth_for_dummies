import { useState } from 'react';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { InputField } from '../InputField';
import { LoggingFormBox } from '../LoggingFormBox';
import { TAuthFormValues, TAuthMode } from '../../models/auth';
import { AuthFormConsts, EMAIl_REG_EXP } from '../../constants';

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
        message: AuthFormConsts.ERRORS.PASSWORD.NOT_MATCH
      });
      return;
    }

    //пока просто выводим в консоль
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
          {authMode === 'signin' ? AuthFormConsts.TITLE.SIGN_IN : AuthFormConsts.TITLE.SIGN_UP}
        </Typography>

        <Controller
          control={control}
          name='email'
          rules={{
            required: {
              value: true,
              message: AuthFormConsts.ERRORS.EMAIL.REQUIRED
            },
            pattern: {
              value: EMAIl_REG_EXP,
              message: AuthFormConsts.ERRORS.EMAIL.INVALID
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
              message: AuthFormConsts.ERRORS.PASSWORD.REQUIRED
            },
            minLength: {
              value: 6,
              //посмотреть в api какие правила
              message: AuthFormConsts.ERRORS.PASSWORD.MIN_LENGTH
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
                message: AuthFormConsts.ERRORS.PASSWORD.REQUIRED
              },
              minLength: {
                value: 6,
                //посмотреть в api какие правила
                message: AuthFormConsts.ERRORS.PASSWORD.MIN_LENGTH
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
          {authMode === 'signin' ? AuthFormConsts.TITLE.SIGN_IN : AuthFormConsts.TITLE.SIGN_UP}
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
          {authMode === 'signin' ? AuthFormConsts.QUESTION.SIGN_IN : AuthFormConsts.QUESTION.SIGN_UP}
        </Button>
      </LoggingFormBox>
    </form>
  );
};

export { LoggingForm };
