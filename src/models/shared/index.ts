import { IDialogContentProps } from 'office-ui-fabric-react';
export interface IDialog {
  content: IDialogContentProps;
  item?: any;
}
export interface IQueryParams {
  skip: number;
  take: number;
  page?: number;
  content?: string;
  sorting?: string;
}
export const InitQueryParams: IQueryParams = {
  page: 1,
  skip: 0,
  take: 10,
  content: '',
  sorting: 'createdDate_DESC',
};
export interface IFormContext {
  isOpen?: boolean;
  isSubmit?: boolean;
  isLoading?: boolean;
  isOverlay?: boolean;
  isComplete?: boolean;
  isProgress?: boolean;
}
export const InitFormContexts: IFormContext = {
  isOpen: false,
  isSubmit: false,
  isLoading: false,
  isOverlay: false,
  isComplete: false,
  isProgress: false,
};
