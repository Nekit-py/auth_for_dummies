export type TAuthMode = 'signin' | 'signup';

export type TAuthFormValues = {
  email: string;
  password: string;
  repassword?: string;
};