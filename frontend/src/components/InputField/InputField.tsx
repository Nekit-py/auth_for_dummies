import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ForwardedRef, forwardRef } from 'react';

type FieldProps = {
  label: string;
  id: string;
  type: string;
  errors: string | undefined;
} & TextFieldProps;

const InputField = forwardRef(({ label, id, type, errors, ...props }: FieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <TextField
        {...props}
        id={id}
        label={label}
        type={type}
        error={!!errors}
        helperText={errors}
        inputRef={ref}
      />
    );
  });

export { InputField };

