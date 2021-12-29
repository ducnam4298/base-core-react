import { GenderType, LanguageCode } from 'models/enum';
import { Root } from 'models/root';

export interface User extends Root {
  primary?: LanguageCode;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  descriptions?: string;
  phoneNumber?: string;
  email?: string;
  profileImage?: string;
  coverImage?: string;
  dob?: Date;
  gender?: GenderType;
  address?: string;
  pob?: string;
  contract?: any;
}

export interface Token {
  accessToken?: string;
  expires?: number;
  refreshToken?: string;
  type?: string;
  content?: string;
  userId: string;
}
