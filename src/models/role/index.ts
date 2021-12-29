import { Root } from 'models/root';

export interface Role extends Root {
  title?: string;
  description?: string;
  default?: boolean;
  static?: boolean;
  permissions?: Permission[];
}

export interface Permission extends Root {
  title?: string;
  level?: number;
  parentPermissionId?: string;
  parentPermissionName?: string;
}
