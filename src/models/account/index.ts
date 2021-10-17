export interface Account {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  rePassword?: string;
  phoneNumber?: string;
  address?: string;
}

export const InitAccount: Account = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rePassword: '',
  phoneNumber: '',
  address: '',
};
