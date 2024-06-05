export interface EmployesInterface {
  id: number;
  name: string | null;
  lastName: string | null;
  email: string | null;
  pay: number | null;
  contractDate: string | null;
  idDept: number;
  nameDept?: string | null;
}
