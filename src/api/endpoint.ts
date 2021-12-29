const BASE_URL = 'https://localhost:5001';
const URL_API = (api: string) => {
  return `${BASE_URL}/api/cms/${api}`;
};
export const Endpoint = {
  UPLOAD_FILE: URL_API('file/file'),
  UPLOAD_IMAGE: URL_API('file/image'),
  CONFIGURATION_URL: URL_API('system/configuration'),
  LANGUAGE_URL: URL_API('system/language'),
  LANGUAGE_USER_URL: URL_API('user/language'),
  REFRESH_TOKEN: `${BASE_URL}/api/refresh-token`,
  SETTING_URL: URL_API('setting'),
  ADMIN_URL : URL_API("admin"),
  BILL_URL: URL_API('bill'),
  BRAND_URL: URL_API('brand'),
  DELIVERY_URL: URL_API('delivery'),
  ORDER_URL: URL_API('order'),
  ROLE: URL_API('role'),
  CUSTOMER_URL: URL_API('customer'),
  USER_URL: URL_API('user'),
};
