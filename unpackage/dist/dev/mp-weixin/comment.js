"use strict";
const common_vendor = require("./common/vendor.js");
const services_index = require("./services/index.js");
if (!Array) {
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_chat2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_list_chat = () => "./uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "./uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "./uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_list_chat + _easycom_uni_list + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "comment",
  props: ["id"],
  emits: ["hide"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const commentList = common_vendor.ref([]);
    common_vendor.ref(null);
    const hideComment = (e) => {
      if (e.detail.y < 160) {
        emits("hide");
      }
    };
    const getComment = async () => {
      const res = await services_index.getCommentApi(props.id);
      commentList.value = res.comments;
    };
    getComment();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(commentList.value, (item, k0, i0) => {
          return {
            a: "14f44f3b-2-" + i0 + "," + ("14f44f3b-1-" + i0),
            b: common_vendor.p({
              title: item.user.nickname,
              avatar: item.user.avatarUrl,
              note: item.content,
              ["badge-positon"]: "left"
            }),
            c: item.commentId,
            d: "14f44f3b-1-" + i0 + ",14f44f3b-0"
          };
        }),
        b: common_vendor.p({
          border: true
        }),
        c: common_vendor.p({
          title: "最新评论",
          type: "line"
        }),
        d: common_vendor.o(hideComment)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-14f44f3b"]]);
exports.MiniProgramPage = MiniProgramPage;
