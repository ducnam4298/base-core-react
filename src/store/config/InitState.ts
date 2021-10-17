import { IApp, IApplicationInfo, ICompanyInfo } from 'models/config';
import * as Assets from 'assets';

export interface State {
  application: IApplicationInfo;
  apps: IApp[];
  company: ICompanyInfo;
}

const InitState: State = {
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
        },
        {
          title: 'Order',
          name: 'Orders',
          url: '/orders',
          icon: Assets.ShoppingCart,
        },
        {
          title: 'Product',
          name: 'Products',
          url: '/products',
          icon: Assets.TShirt,
        },
        {
          title: 'Bill',
          name: 'Bills',
          url: '/bills',
          icon: Assets.Bill,
        },
        {
          title: 'Delivery',
          name: 'Deliveries',
          url: '/deliveries',
          icon: Assets.Transport,
        },
        {
          title: 'Brand',
          name: 'Brands',
          url: '/brands',
          icon: Assets.Brand,
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
            },
            {
              title: 'Customer',
              name: 'Customers',
              url: '/customers',
              icon: Assets.Customer,
            },
          ],
        },
        {
          title: 'Role',
          name: 'Roles',
          url: '/roles',
          icon: Assets.MemberSecurity,
        },
        {
          title: 'Setting',
          name: 'Settings',
          url: '/settings',
          icon: Assets.Setting,
        },
      ],
    },
  ],
};

export default InitState;
