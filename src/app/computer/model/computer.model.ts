import {Company} from '../../company/company.model'

export interface Computer{
  id?: Number;
  name: string;
  introduced: Date; 
  discontinued: Date; 
  company: Company;
}
