"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "list",
  props: ["songList"],
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.songList, (item, k0, i0) => {
          return {
            a: item.picUrl,
            b: common_vendor.t(item.name)
          };
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
