import TextField, { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

type FieldProps = {
  label: string;
  id: string;
  type: string;
  errors: string | undefined;
} & TextFieldProps;

const InputField = forwardRef(({ label, id, type, errors, ...props }: FieldProps, ref) => {
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



// import TextField, { TextFieldProps } from '@mui/material/TextField';
// import { TAuthFormValues } from '../../models/auth';
// import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

// type FieldProps = {
//   label: string;
//   id: string;
//   type: string;
//   name: Path<TAuthFormValues>;
//   register: UseFormRegister<TAuthFormValues>;
//   rules: RegisterOptions<TAuthFormValues>;
//   errors: string | undefined;
// } & TextFieldProps;

// const InputField = ({ label, id, type, register, name, rules, errors }: FieldProps) => {
//   return (
//     <TextField
//       id={id}
//       label={label}
//       type={type}
//       error={!!errors}
//       helperText={errors}
//       {...register(name, rules)}
//     />
//   );
// };

// export { InputField };
