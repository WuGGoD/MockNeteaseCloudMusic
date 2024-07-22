"use strict";
const common_vendor = require("../../../../common/vendor.js");
const services_index = require("../../../../services/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + songsLIstVue + commentVue)();
}
const commentVue = () => "./comment/comment2.js";
const songsLIstVue = () => "./songsLIst/songsLIst2.js";
const _sfc_main = {
  __name: "rankingPlaylist",
  setup(__props) {
    const id = common_vendor.ref("");
    const playList = common_vendor.ref(null);
    common_vendor.ref("");
    const show = common_vendor.ref(false);
    common_vendor.onLoad((option) => {
      id.value = option.id;
      getRankDetail(id.value);
    });
    const getRankDetail = async (id2) => {
      const res = await services_index.getRankDetailApi(id2);
      common_vendor.nextTick$1(() => {
        playList.value = res.playlist;
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: playList.value
      }, playList.value ? common_vendor.e({
        b: playList.value.coverImgUrl,
        c: playList.value.coverImgUrl,
        d: common_vendor.t(playList.value.name),
        e: common_vendor.t(playList.value.description),
        f: common_vendor.p({
          type: "redo-filled",
          size: "22",
          color: "white"
        }),
        g: common_vendor.t(playList.value.shareCount),
        h: common_vendor.p({
          type: "chat-filled",
          size: "22",
          color: "white"
        }),
        i: common_vendor.t(playList.value.commentCount),
        j: common_vendor.o(($event) => show.value = true),
        k: common_vendor.p({
          type: "folder-add-filled",
          size: "22",
          color: "white"
        }),
        l: common_vendor.t(playList.value.subscribedCount),
        m: common_vendor.p({
          list: playList.value.tracks
        }),
        n: show.value
      }, show.value ? {
        o: playList.value.id,
        p: common_vendor.o(($event) => show.value = false),
        q: common_vendor.p({
          id: playList.value.id
        })
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5ab3bf11"]]);
wx.createPage(MiniProgramPage);
