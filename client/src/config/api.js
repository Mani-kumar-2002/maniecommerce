const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export const endpoints = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    checkAuth: `${API_BASE_URL}/api/auth/check-auth`,
    forgotPassword: `${API_BASE_URL}/api/auth/forgot-password`,
    resetPassword: `${API_BASE_URL}/api/auth/reset-password`,
    logout: `${API_BASE_URL}/api/auth/logout`,
  },
  admin: {
    products: {
      base: `${API_BASE_URL}/api/admin/products`,
      upload: `${API_BASE_URL}/api/admin/products/upload-image`,
    },
    orders: `${API_BASE_URL}/api/admin/orders`,
  },
  shop: {
    products: `${API_BASE_URL}/api/shop/products`,
    cart: `${API_BASE_URL}/api/shop/cart`,
    address: `${API_BASE_URL}/api/shop/address`,
    order: `${API_BASE_URL}/api/shop/order`,
    search: `${API_BASE_URL}/api/shop/search`,
    review: `${API_BASE_URL}/api/shop/review`,
  },
  common: {
    feature: `${API_BASE_URL}/api/common/features`,
  },
};