"use strict";
const common_vendor = require("../../common/vendor.js");
const store_userInfo = require("../../store/userInfo.js");
const services_index = require("../../services/index.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const userStore = store_userInfo.useUserStore();
    const playList = common_vendor.ref(null);
    const userDetail = async () => {
      console.log(userStore.account);
      await services_index.getUserDetail(userStore.account.id);
      const list = await services_index.getPlayList(userStore.account.id);
      playList.value = list.playlist;
      common_vendor.nextTick$1();
    };
    common_vendor.watch(
      () => userStore.verify,
      () => {
        if (userStore.verify) {
          userDetail();
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return common_vendor.e({
        a: !common_vendor.unref(userStore).verify
      }, !common_vendor.unref(userStore).verify ? {} : {}, {
        b: common_vendor.unref(userStore).verify
      }, common_vendor.unref(userStore).verify ? {
        c: (_a = common_vendor.unref(userStore).verify) == null ? void 0 : _a.avatarUrl,
        d: common_vendor.t((_b = common_vendor.unref(userStore).verify) == null ? void 0 : _b.nickname),
        e: common_vendor.t((_c = common_vendor.unref(userStore).verify) == null ? void 0 : _c.followeds),
        f: common_vendor.t((_d = common_vendor.unref(userStore).verify) == null ? void 0 : _d.follows),
        g: common_vendor.t((_e = common_vendor.unref(userStore).verify) == null ? void 0 : _e.level),
        h: common_vendor.t((_f = common_vendor.unref(userStore).verify) == null ? void 0 : _f.listenSongs),
        i: `url(${(_g = common_vendor.unref(userStore).verify) == null ? void 0 : _g.backgroundUrl})`,
        j: common_vendor.f(playList.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: "7c2ebfa5-1-" + i0 + ",7c2ebfa5-0",
            c: common_vendor.p({
              title: item.name,
              note: `${item.trackCount}首·${item.playCount}次播放`,
              thumb: item.coverImgUrl,
              ["thumb-size"]: "lg",
              clickable: ""
            })
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
