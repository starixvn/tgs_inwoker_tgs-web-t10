import featureList from "./features";

var template = 15; //2 for T2, 3 for T3 (based on .xd file)
const config = {
  baseUrl:
    window?.env?.apiUrl ||
    (window?.env ? "/api/" : "https://stg-t1.rpgp.cc/api/"),
  client:
    window?.env?.client ||
    "d4biT0QTUalS0Uy4Lgvss9Lq70t0gT2tf3usvZkoLUGzvbIJ3e4RnO",
  currency: window?.env?.currency || "CNY",
  brand: window?.env?.brand || process.env.REACT_APP_BRAND || "xxx",
  brandName: window?.env?.brandName
    ? window?.env?.brandName
    : window?.env?.brand || "xxxx",
  theme: window?.env?.theme || "28WIN",
  wapVersion: template,
  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
  defaultLanguage: window?.env?.defaultLanguage
    ? window?.env?.defaultLanguage === ""
      ? "zh-CN"
      : window?.env?.defaultLanguage
    : "zh-CN",
  affiliateId: window?.env?.affiliateId || "",
  features: featureList["default"],
  configUrl: window?.env?.configUrl || "https://app12.srvptt.com/",
};

export default config;
