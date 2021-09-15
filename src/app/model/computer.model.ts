import {Company} from './company.model'

export interface Computer{
  id?: Number;
  name: string;
  introduced: string; 
  discontinued: string; 
  company: Company;
}
