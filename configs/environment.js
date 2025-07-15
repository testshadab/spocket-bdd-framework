// config/environment.js
const prod = {
    spocketUrl: "https://app.spocket.co/login",
    dropshiptoolUrl: "https://production.dropshiptool.io/",
    ENV: "prod"
};

const staging = {
    spocketUrl: "http://app.staging-spocket.co/",
    shopifyUrl: "https://admin.shopify.com/store/spocketqastaging/",
    dropshiptoolUrl: "https://staging.dropshiptool.io/",
    ENV: "staging"
};
const ENV = process.env.TEST_ENV || "staging";
const environmentConfig = {
    prod,
    staging,
};
export default environmentConfig[ENV];