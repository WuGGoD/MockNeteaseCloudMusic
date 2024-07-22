"use strict";
const common_vendor = require("../../../../common/vendor.js");
const services_index = require("../../../../services/index.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_card = () => "../../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_grid_item = () => "../../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section + _easycom_uni_grid_item + _easycom_uni_grid)();
}
const _sfc_main = {
  __name: "rank",
  setup(__props) {
    const officialList = common_vendor.ref([]);
    const otherList = common_vendor.ref([]);
    const onClick = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/index/banner/rankingPlaylist/rankingPlaylist?id=${encodeURIComponent(id)}`,
        success: function() {
          console.log("跳转成功");
        },
        fail: function(err) {
          console.error("跳转失败", err);
        }
      });
    };
    const getRank = async () => {
      const res = await services_index.getRankApi();
      console.log(res);
      officialList.value = res.list.slice(0, 4);
      otherList.value = res.list.slice(4);
    };
    getRank();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(officialList.value, (item, k0, i0) => {
          return {
            a: common_vendor.f(item.tracks, (songs, index, i1) => {
              return {
                a: common_vendor.t(index + 1),
                b: common_vendor.t(songs.first),
                c: common_vendor.t(songs.second),
                d: songs.first
              };
            }),
            b: item.id,
            c: common_vendor.o(($event) => onClick(item.id), item.id),
            d: "80d526ad-1-" + i0 + ",80d526ad-0",
            e: common_vendor.p({
              title: item.name,
              ["sub-title"]: item.playCount,
              extra: item.updateFrequency,
              thumbnail: item.coverImgUrl
            })
          };
        }),
        b: common_vendor.p({
          title: "官方榜",
          type: "line"
        }),
        c: common_vendor.f(otherList.value, (item, index, i0) => {
          return {
            a: item.coverImgUrl,
            b: item.id,
            c: common_vendor.o(($event) => onClick(item.id), item.id),
            d: "80d526ad-4-" + i0 + ",80d526ad-3",
            e: common_vendor.p({
              index
            })
          };
        }),
        d: common_vendor.o(_ctx.change),
        e: common_vendor.p({
          column: 3,
          ["show-border"]: false,
          square: false
        }),
        f: common_vendor.p({
          title: "其他榜单",
          type: "line",
          padding: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-80d526ad"]]);
wx.createPage(MiniProgramPage);
