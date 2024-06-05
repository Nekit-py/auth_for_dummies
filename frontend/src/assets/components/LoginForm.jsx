import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        Регистрация
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email); // Обработка по onSubmit, например вывести email в log
            handleClose();
          },
        }}
      >
        <DialogTitle>Регистрация</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Для регистрации в проекте, пожалуйста, введите свой e-mail адрес и
              придумайте пароль.
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            name='email'
            label='Ваш Email'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            name='email'
            label='Ваш пароль'
            type='password'
            fullWidth
            variant='standard'
            error
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            name='email'
            label='Повторите пароль'
            type='password'
            fullWidth
            variant='standard'
            error
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type='submit'>Зарегистрировться</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export { FormDialog };
