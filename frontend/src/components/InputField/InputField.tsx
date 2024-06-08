import TextField from '@mui/material/TextField';

type FieldProps = {
  label: string;
  id: string;
  type?: string
};

const InputField = ({ label, id, type}: FieldProps) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
    />
  );
};

export { InputField };
