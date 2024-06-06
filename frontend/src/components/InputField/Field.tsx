import TextField from '@mui/material/TextField';

type FieldProps = {
  type: 'email' | 'password';
  label: string;
};

const Field = ({ type, label }: FieldProps) => {
  return (
    <TextField
      required
      id='outlined-password-input'
      label={label}
      type={type}
      margin='normal'
    />
  );
};

export { Field };
