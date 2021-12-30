import { IApp, IApplicationInfo, ICompanyInfo } from 'models/config';
import * as Assets from 'assets';

export interface State {
  application: IApplicationInfo;
  apps: IApp[];
  company: ICompanyInfo;
}

export const InitState: State = {
  application: {
    logo: '',
    title: 'Base Core React',
    description: 'Design by Nam Bắp',
    version: '1.0.0',
    webUrl: '',
  },
  company: {
    name: 'Base Core React',
    webUrl: 'https://www.facebook.com/ducnam4298/',
  },
  apps: [
    {
      title: 'Base Core React',
      name: 'Home',
      url: '/',
      menu: [
        {
          title: 'DashBoard',
          name: 'Home',
          url: '/',
          icon: Assets.Dashboard,
          roles: ['DashBoard'],
        },
        {
          title: 'Order',
          name: 'Order',
          url: '/orders',
          icon: Assets.ShoppingCart,
          roles: ['Order'],
        },
        {
          title: 'Product',
          name: 'Product',
          url: '/products',
          icon: Assets.TShirt,
          roles: ['Product'],
        },
        {
          title: 'Bill',
          name: 'Bill',
          url: '/bills',
          icon: Assets.Bill,
          roles: ['Bill'],
        },
        {
          title: 'Delivery',
          name: 'Delivery',
          url: '/deliveries',
          icon: Assets.Transport,
          roles: ['Delivery'],
        },
        {
          title: 'Brand',
          name: 'Brand',
          url: '/brands',
          icon: Assets.Brand,
          roles: ['Brand'],
        },
        {
          title: 'User',
          name: 'User',
          icon: Assets.People,
          roles: ['Employee', 'User'],
          menu: [
            {
              title: 'Employee',
              name: 'Employee',
              url: '/employees',
              icon: Assets.Employee,
              parentRoles: 'Employee',
              roles: ['View'],
            },
            {
              title: 'Customer',
              name: 'Customer',
              url: '/customers',
              icon: Assets.Customer,
              parentRoles: 'User',
              roles: ['View'],
            },
          ],
        },
        {
          title: 'Role',
          name: 'Role',
          url: '/roles',
          icon: Assets.MemberSecurity,
          roles: ['Role'],
        },
        {
          title: 'Setting',
          name: 'Setting',
          url: '/settings',
          icon: Assets.Setting,
          roles: ['Setting'],
        },
      ],
    },
  ],
};
