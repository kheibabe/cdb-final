import {Company} from './company.model'

export interface Computer{
  id?: Number;
  name: String;
  introduced: Date; //Date
  discontinued: String; //Date
  company: Company;
}
