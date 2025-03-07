import Cookies from 'js-cookie';

const setItem = async (key: string, value: string, expirationDays?: number) => {
  if (expirationDays !== undefined) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    await Cookies.set(key, value, { expires: expirationDate, secure: true });
  } else {
    await Cookies.set(key, value, { secure: true });
  }
};
const deleteItem = async (key: string) => {
  await Cookies.remove(key);
};

type getItemDataType = string | null;
const getItem = async (key: string, defaultVal?: string): Promise<{ data: getItemDataType | undefined }> => {
  const data = await Cookies.get(key);
  if (data === null && defaultVal) {
    const doesKeyExist = await keyExist();
    if (doesKeyExist) return { data };
    else {
      await setItem(key, defaultVal);
      return { data: defaultVal };
    }
  }

  return { data };
};


const keyExist = async () => {
  const allKeys = await Cookies.get();
  const keyFound = allKeys;

  // find((item) => item === key);
  return Boolean(keyFound !== undefined);
};

export const LocalStorage = {
  getItem,
  setItem,
  keyExist,
  deleteItem
};
