export interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
}

export interface SignInDetails {
  email: string;
  password: string;
}

export interface SignUpDetails {
  name: string;
  email: string;
  password: string;
}