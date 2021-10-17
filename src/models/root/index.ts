export interface Root {
  id?: string;
  createdBy?: ByPerson;
  createdDate?: string | Date;
  createById?: string;
  modifiedBy?: ByPerson;
  modifiedDate?: string | Date;
  modifiedById?: string;
}

export interface ByPerson {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}
