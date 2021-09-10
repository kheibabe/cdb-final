import { Authority } from './authority.model';

export interface User{
    id?: number;
    username: string;
    password: string;
    authorities: Authority[];
  }
  