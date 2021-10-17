export enum SwitchAuthenticated {
  LOGGEDIN = 0,
  LOGGEDOUT = 1,
}

export interface IUser {
  id: string;
  code: string;
  fullName: string;
  avatar: string;
  email: string;
  roleId: number;
  roles: IRole[];
}

interface IRole {
  id: number;
  roleId: number;
  roleCode: string;
  roleName: string;
  departmentId: number;
  departmentCode: string;
  departmentName: string;
  isDefault: boolean;
}
