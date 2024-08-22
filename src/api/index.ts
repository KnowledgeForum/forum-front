export const API_URL =
  import.meta.env.ENVIROMENT === "production" ? import.meta.env.API_URL_PRODUCT : import.meta.env.API_URL_DEVELOPMENT;
