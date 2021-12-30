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
          name: 'Orders',
          url: '/orders',
          icon: Assets.ShoppingCart,
          roles: ['Order'],
        },
        {
          title: 'Product',
          name: 'Products',
          url: '/products',
          icon: Assets.TShirt,
          roles: ['Product'],
        },
        {
          title: 'Bill',
          name: 'Bills',
          url: '/bills',
          icon: Assets.Bill,
          roles: ['Bill'],
        },
        {
          title: 'Delivery',
          name: 'Deliveries',
          url: '/deliveries',
          icon: Assets.Transport,
          roles: ['Delivery'],
        },
        {
          title: 'Brand',
          name: 'Brands',
          url: '/brands',
          icon: Assets.Brand,
          roles: ['Brand'],
        },
        {
          title: 'User',
          name: 'Users',
          icon: Assets.People,
          menu: [
            {
              title: 'Employee',
              name: 'Employees',
              url: '/employees',
              icon: Assets.Employee,
              roles:["Employee"]
            },
            {
              title: 'Customer',
              name: 'Customers',
              url: '/customers',
              icon: Assets.Customer,

              roles: ['User'],
            },
          ],
        },
        {
          title: 'Role',
          name: 'Roles',
          url: '/roles',
          icon: Assets.MemberSecurity,
          roles: ['Role'],
        },
        {
          title: 'Setting',
          name: 'Settings',
          url: '/settings',
          icon: Assets.Setting,
          roles: ['Setting'],
        },
      ],
    },
  ],
};
