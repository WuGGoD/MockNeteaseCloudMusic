"use strict";
const common_vendor = require("../common/vendor.js");
const services_index = require("../services/index.js");
const useUserStore = common_vendor.defineStore("user", () => {
  const verify = common_vendor.index.getStorageSync("verify") ? common_vendor.ref(common_vendor.index.getStorageSync("verify")) : common_vendor.ref(null);
  const account = common_vendor.index.getStorageSync("account") ? common_vendor.ref(common_vendor.index.getStorageSync("account")) : common_vendor.ref(null);
  const getAccount = async () => {
    const res = await services_index.loginStatus();
    console.log("89989898989", res);
    common_vendor.index.setStorageSync("account", res.data.account);
    account.value = res.data.account;
    console.log(account.value);
    if (res.data.account) {
      userDetail();
    }
  };
  const userDetail = async () => {
    const res = await services_index.getUserDetail(account.value.id);
    const accountInfo = await services_index.getUserAccount();
    const subcountInfo = await services_index.getUserSubcount();
    const levelInfo = await services_index.getUserLevel();
    console.log("detail", res);
    console.log(2222222222, accountInfo);
    console.log(33333, subcountInfo);
    console.log(44444444, levelInfo);
    const obj = {
      ...res.profile,
      level: levelInfo.data.level,
      listenSongs: res.listenSongs || 99999,
      createDays: res.createDays || 99999
    };
    verify.value = obj;
    common_vendor.index.setStorageSync("verify", obj);
  };
  return {
    verify,
    account,
    userDetail,
    getAccount
  };
});
exports.useUserStore = useUserStore;
