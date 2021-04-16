import { ADDPERSON } from '../constart';

export const addPerson = (personObj) => ({ type: ADDPERSON, data: personObj });