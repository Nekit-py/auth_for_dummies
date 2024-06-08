import Box from '@mui/material/Box';

type ButtonProps = {
  children: React.ReactNode;
};

 function LoggingFormBox({ children }: ButtonProps) {
  return (
    <Box
      minHeight={200}
      width={200}
      my={4}
      display='flex'
      alignItems='center'
      flexDirection='column'
      gap={2}
      p={2}
      sx={{ border: '2px solid #1976d2' }}
    >
      {children}
    </Box>
  );
}

export {LoggingFormBox}