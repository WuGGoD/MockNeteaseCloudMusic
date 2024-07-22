"use strict";
const common_vendor = require("./common/vendor.js");
if (!Array) {
  const _component_path = common_vendor.resolveComponent("path");
  const _component_svg = common_vendor.resolveComponent("svg");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_path + _component_svg + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "./uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "songsLIst",
  props: ["list"],
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          d: "M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z",
          fill: "#dc0019",
          ["p-id"]: "4479"
        }),
        b: common_vendor.p({
          d: "M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z",
          fill: "#dc0019",
          ["p-id"]: "4480"
        }),
        c: common_vendor.p({
          t: "1721374876019",
          viewBox: "0 0 1024 1024",
          version: "1.1",
          xmlns: "http://www.w3.org/2000/svg",
          ["p-id"]: "4478",
          id: "mx_n_1721374876020",
          width: "28",
          height: "28"
        }),
        d: common_vendor.t(__props.list.length),
        e: common_vendor.f(__props.list, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.ar[0].name),
            d: "79956fe7-3-" + i0,
            e: item.id
          };
        }),
        f: common_vendor.p({
          type: "forward",
          size: "16",
          color: "grey"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79956fe7"]]);
exports.MiniProgramPage = MiniProgramPage;
