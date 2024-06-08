import TextField from '@mui/material/TextField';

type FieldProps = {
  type: 'email' | 'password';
  label: string;
  id: string;
};

const InputField = ({ type, label, id }: FieldProps) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
    />
  );
};

export { InputField };
