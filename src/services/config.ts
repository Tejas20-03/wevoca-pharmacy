// export const BASE_URL_DVAGO_API = 'https://apidb.dvago.pk';
export const BASE_URL_DVAGO_API = "https://service-unitedpharma.cloubuzz.com/";
// export const BETA_URL_DVAGO_API = 'https://apidbbeta.dvago.pk';
export const BETA_URL_DVAGO_API = "https://service-unitedpharma.cloubuzz.com/";

export const BASE_URL_WEB_REQUEST_API =
  "https://service-unitedpharma.cloubuzz.com//AppAPIV3";
export const BASE_URL_GOOGLE_MAPS = "https://maps.googleapis.com/maps/api";

export type configDataType = {
  token?: string;
  contentType?: "application/json" | "multipart/form-data";
};

export const REQUEST_CONFIG = (configData: configDataType) => {
  const headers: Record<string, string> = {};

  if (!!configData.token) headers["X-Authorization"] = `${configData.token}`;
  if (!!configData.contentType)
    headers["Content-Type"] = configData.contentType;
  return { headers };
};
