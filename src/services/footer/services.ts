import { AxiosGet } from "@/utils/api-methods";
import { BASE_URL_DVAGO_API, configDataType } from "@/services/config";

const setErrorMessage = (message: string) => ({
  title: "Invalid Footer Components",
  message,
});

const GetTranslation_Api = () =>
  `${BASE_URL_DVAGO_API}/AppAPIV3/GetTranslation&Value=Translation`;

export const GetTranslatedData = (configData: configDataType) =>
  AxiosGet<any>(
    GetTranslation_Api(),
    configData,
    setErrorMessage("getTranslatedData method")
  );
