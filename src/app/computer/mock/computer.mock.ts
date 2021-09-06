import { Computer } from '../model/computer.model';

export const MOCK: Computer[] = [
  {

    id: 0,
    name: 'Daiquiri',
    introduced: new Date("12/02/1993"),
    discontinued: 'undefined',
    company: {
      name: 'apple',
    },

  },
  {
    id: 1,
    name: 'Piña Colada',
    introduced: new Date("12/02/1993"),
    discontinued: 'undefined',
    company: {
      name: 'apple',
    },


  }
];
