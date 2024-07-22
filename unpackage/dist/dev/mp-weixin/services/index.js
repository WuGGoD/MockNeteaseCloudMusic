"use strict";
const common_vendor = require("../common/vendor.js");
const base = "https://zyxcl.xyz/music/api";
const request = (method, url, options = {}) => {
  common_vendor.index.showLoading({
    title: "加载中",
    mask: true
  });
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      method,
      url: base + url,
      data: {
        ...options
      },
      withCredentials: true,
      success: (res) => {
        resolve(res.data);
        common_vendor.index.hideLoading();
      },
      fail: (e) => {
        reject(e);
        common_vendor.index.hideLoading;
      }
    });
  });
};
const getListApi = () => request("get", "/personalized");
const loginCellPhone = (phone) => request("get", `/captcha/sent?phone=${phone}`);
const loginCaptCha = (phone, code) => request(
  "get",
  `/captcha/verify?phone=${phone}&captcha=${code}`
);
const emailLogin = (email, password) => request("get", `/login?email=${email}&password=${password}`);
const qrKey = () => request("get", `/login/qr/key?timestamp=${Date.now()}`);
const qrCreate = (key) => request("get", `/login/qr/create?timestamp=${Date.now()}&key=${key}&qrimg=qrimg`);
const qrCheck = (key) => request("get", `/login/qr/check?timestamp=${Date.now()}&key=${key}`);
const getSearchHotApi = () => request("get", "/search/hot/detail");
const loginStatus = () => request("get", `/login/status`);
const getUserDetail = (id) => request("get", `/user/detail?uid=${id}`);
const getUserAccount = () => request("get", `/user/account`);
const getUserSubcount = () => request("get", `/user/subcount`);
const getUserLevel = () => request("get", `/user/level`);
const getPlayList = (id) => request("get", `/user/playlist?uid=${id}`);
const singleSong = (id) => request(
  "get",
  `/song/url/v1?id=${typeof id === "object" ? id.join(",") : id}&level=lossless`
);
const songCheck = (id) => request("get", `/check/music?id=${id}`);
const getRankDetailApi = (id) => request("get", `/playlist/detail?id=${id}`);
const getBannerApi = () => request("get", "/banner");
const getBallIconApi = () => request("get", "/homepage/block/page");
const getRankApi = () => request("get", "/toplist/detail");
const getCommentApi = (id) => request("get", `/comment/playlist?id=${id}`);
exports.emailLogin = emailLogin;
exports.getBallIconApi = getBallIconApi;
exports.getBannerApi = getBannerApi;
exports.getCommentApi = getCommentApi;
exports.getListApi = getListApi;
exports.getPlayList = getPlayList;
exports.getRankApi = getRankApi;
exports.getRankDetailApi = getRankDetailApi;
exports.getSearchHotApi = getSearchHotApi;
exports.getUserAccount = getUserAccount;
exports.getUserDetail = getUserDetail;
exports.getUserLevel = getUserLevel;
exports.getUserSubcount = getUserSubcount;
exports.loginCaptCha = loginCaptCha;
exports.loginCellPhone = loginCellPhone;
exports.loginStatus = loginStatus;
exports.qrCheck = qrCheck;
exports.qrCreate = qrCreate;
exports.qrKey = qrKey;
exports.singleSong = singleSong;
exports.songCheck = songCheck;
