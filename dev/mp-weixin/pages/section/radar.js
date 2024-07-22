"use strict";
const common_vendor = require("../../common/vendor.js");
const services_index = require("../../services/index.js");
if (!Math) {
  songList();
}
const songList = () => "./list.js";
const _sfc_main = {
  __name: "radar",
  setup(__props) {
    const list = common_vendor.ref(null);
    const getList = async () => {
      const res = await services_index.getListApi();
      console.log(res.result);
      list.value = res.result;
    };
    getList();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(5, (item, index, i0) => {
          var _a;
          return {
            a: item,
            b: "5945e738-0-" + i0,
            c: common_vendor.p({
              songList: (_a = list.value) == null ? void 0 : _a.slice(index * 6 + 1, (index + 1) * 6)
            })
          };
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
