import {Company} from '../../company/company.model'

export interface Computer{
  id?: Number;
  name: String;
  introduced: Date; 
  discontinued: Date; 
  company: Company;
}
