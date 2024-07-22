"use strict";
const common_vendor = require("./common/vendor.js");
const services_index = require("./services/index.js");
const _sfc_main = {
  __name: "banner",
  setup(__props) {
    const banner = common_vendor.ref([]);
    const indicatorDots = common_vendor.ref(true);
    const autoplay = common_vendor.ref(true);
    const interval = common_vendor.ref(5e3);
    const duration = common_vendor.ref(500);
    const navList = common_vendor.ref([]);
    const toRank = (val) => {
      if (val === "排行榜") {
        common_vendor.index.navigateTo({
          url: "/pages/index/banner/rank/rank"
        });
      }
    };
    const getBanner = async () => {
      const res = await services_index.getBannerApi();
      banner.value = res.banners;
    };
    const getBallIcon = async () => {
      const res = await services_index.getBallIconApi();
      localStorage.setItem("navlist", JSON.stringify(res.data.blocks[1].creatives[0].resources));
    };
    navList.value = JSON.parse(localStorage.getItem("navlist"));
    getBanner();
    getBallIcon();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(banner.value, (item, k0, i0) => {
          return {
            a: item.imageUrl,
            b: item.encodeId
          };
        }),
        b: indicatorDots.value,
        c: autoplay.value,
        d: interval.value,
        e: duration.value,
        f: common_vendor.f(navList.value, (item, k0, i0) => {
          return {
            a: item.uiElement.image.imageUrl,
            b: common_vendor.t(item.uiElement.mainTitle.title),
            c: item.uiElement.mainTitle.title,
            d: common_vendor.o(($event) => toRank(item.uiElement.mainTitle.title), item.uiElement.mainTitle.title)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5faefcf4"]]);
exports.MiniProgramPage = MiniProgramPage;
