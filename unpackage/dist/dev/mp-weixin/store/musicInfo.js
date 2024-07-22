"use strict";
const common_vendor = require("../common/vendor.js");
const services_index = require("../services/index.js");
const useMusicStore = common_vendor.defineStore("music", () => {
  const playList = common_vendor.ref(null);
  const listId = common_vendor.ref("24381616");
  const getSongs = async () => {
    const res = await services_index.getRankDetailApi(listId.value);
    playList.value = res.playlist.tracks;
  };
  return {
    playList,
    listId,
    getSongs
  };
});
exports.useMusicStore = useMusicStore;
