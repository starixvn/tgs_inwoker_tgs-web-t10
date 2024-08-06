import featureList from "./features";

const config = {
  baseUrl:
    window?.env?.apiUrl ||
    (window?.env ? "/api/" : "https://dev-t1.rpgp.cc/api/"),
  client:
    window?.env?.client ||
    "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ",
  currency: window?.env?.currency || "CNY",
  brand: window?.env?.brand || process.env.REACT_APP_BRAND || "PB2",
  brandName: window?.env?.brandName
    ? window?.env?.brandName
    : window?.env?.brand || "PB2",
  theme: window?.env?.theme || "PB2",
  wapVersion: window?.env?.wapTemplate || 10,
  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
  defaultLanguage: window?.env?.defaultLanguage
    ? window?.env?.defaultLanguage === ""
      ? "zh-CN"
      : window?.env?.defaultLanguage
    : "zh-CN",
  affiliateId: window?.env?.affiliateId || "",
  features: featureList["default"],
  configUrl: window?.env?.configUrl || "https://app12.srvptt.com/",
  version: window?.env?.version,
  template: 't10'
};

export default config;
