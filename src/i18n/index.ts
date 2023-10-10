import commonEn from "./locale/en/common.json";
import user from "./locale/vi/user.json";
export const defaultLocale = "vi";
export const languages = {
  en: { ...commonEn },
  vi: {
    ...user,
  },
};
