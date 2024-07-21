"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/mine/mine.js";
  "./pages/login/login.js";
  "./pages/index/search/search.js";
  "./pages/searchPage/searchPage.js";
  "./pages/index/banner/banner.js";
  "./pages/audio/audio.js";
  "./pages/index/banner/recommend/recommend.js";
  "./pages/index/banner/rank/rank.js";
  "./pages/index/banner/rankingPlaylist/rankingPlaylist.js";
  "./pages/index/banner/rankingPlaylist/comment/comment.js";
  "./pages/index/banner/rankingPlaylist/songsLIst/songsLIst.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
