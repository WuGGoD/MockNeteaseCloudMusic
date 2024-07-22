"use strict";
const common_vendor = require("./common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "./uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "./uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const popup = common_vendor.ref(null);
    const open = () => {
      popup.value.open("left");
    };
    const goSearchPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/searchPage/searchPage"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(open),
        b: common_vendor.p({
          type: "bars",
          size: "30"
        }),
        c: common_vendor.sr(popup, "4afbeb02-1", {
          "k": "popup"
        }),
        d: common_vendor.p({
          type: "left",
          ["border-radius"]: "10px 10px 0 0"
        }),
        e: common_vendor.p({
          type: "search",
          size: "20",
          color: "#b3b3b3"
        }),
        f: common_vendor.o(goSearchPage)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4afbeb02"]]);
exports.MiniProgramPage = MiniProgramPage;
