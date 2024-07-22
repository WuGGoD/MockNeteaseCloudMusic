"use strict";
const common_vendor = require("../../common/vendor.js");
const services_index = require("../../services/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "searchPage",
  setup(__props) {
    const HotDetailList = common_vendor.ref([]);
    const HistorylList = common_vendor.ref([]);
    const toSearchHistory = (item) => {
      if (!HistorylList.value.includes(item.searchWord)) {
        HistorylList.value.push(item.searchWord);
      }
    };
    const clearHistory = () => {
      HistorylList.value = [];
    };
    const getHotDetailList = async () => {
      const res = await services_index.getSearchHotApi();
      HotDetailList.value = res.data;
    };
    getHotDetailList();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "search",
          size: "20",
          color: "#b3b3b3"
        }),
        b: common_vendor.o((...args) => _ctx.goSearchPage && _ctx.goSearchPage(...args)),
        c: common_vendor.o(clearHistory),
        d: HistorylList.value.length > 0,
        e: common_vendor.p({
          type: "trash",
          size: "20"
        }),
        f: common_vendor.f(HistorylList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        g: common_vendor.f(HotDetailList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.n(index <= 2 ? "red" : ""),
            c: common_vendor.t(item.searchWord),
            d: common_vendor.o(($event) => toSearchHistory(item))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-56af9171"]]);
wx.createPage(MiniProgramPage);
