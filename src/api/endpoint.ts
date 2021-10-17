const BASE_URL = 'https://api-tyrantphone.com';
const URL_API = `${BASE_URL}/api/admin/v1`;
// const URL_API = `${BASE_URL}/api/mobile/v1`;
export const Endpoint = {
  UPLOAD_FILE: `${URL_API}/file/file`,
  UPLOAD_IMAGE: `${URL_API}/file/image`,
  CONFIGURATION_URL: `${URL_API}/system/configuration`,
  LANGUAGE_URL: `${URL_API}/system/language`,
  LANGUAGE_USER_URL: `${URL_API}/user/language`,
  REFRESH_TOKEN: `${BASE_URL}/api/refreshtoken`,
  SETTING_URL: `${URL_API}/setting`,

  BILL_URL: `${URL_API}/bill`,
  BRAND_URL: `${URL_API}/brand`,
  DELIVERY_URL: `${URL_API}/delivery`,
  ORDER_URL: `${URL_API}/order`,
  ROLE: `${URL_API}/role`,
  CUSTOMER_URL: `${URL_API}/customer`,
  USER_URL: `${URL_API}/user`,
};
