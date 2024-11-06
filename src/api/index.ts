export const API_URL =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_API_URL_PRODUCT
    : import.meta.env.VITE_API_URL_DEVELOPMENT;
