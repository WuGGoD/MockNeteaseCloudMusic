"use strict";
const common_vendor = require("../../common/vendor.js");
const services_index = require("../../services/index.js");
const store_userInfo = require("../../store/userInfo.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    let timer;
    const userStore = store_userInfo.useUserStore();
    const loginMethod = common_vendor.ref(0);
    const methods = common_vendor.ref(["手机号登陆", "邮箱登录", "二维码登录"]);
    const phone = common_vendor.ref("");
    const captCha = common_vendor.ref("");
    async function login() {
      if (loginMethod.value === 0) {
        const res = await services_index.loginCaptCha(phone.value, captCha.value);
        console.log(res);
      }
    }
    async function sendCode() {
      const code = await services_index.loginCellPhone(phone.value);
      console.log(code);
    }
    const email = common_vendor.ref("");
    const password = common_vendor.ref("");
    async function emailMethod() {
      const res = await services_index.emailLogin(email.value, password.value);
      common_vendor.index.setStorageSync("curCookie", res.cookie);
      userStore.getAccount(res.cookie);
      common_vendor.index.showToast({
        title: "登录成功,即将返回个人页面",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/mine/mine"
        });
      }, 1e3);
    }
    const qrUrl = common_vendor.ref("");
    async function qrLogin() {
      clearInterval(timer);
      const qr = await services_index.qrKey();
      console.log(qr.data);
      const key = qr.data.unikey;
      const create = await services_index.qrCreate(key);
      qrUrl.value = create.data.qrimg;
      timer = setInterval(async () => {
        const check = await services_index.qrCheck(key);
        console.log(check);
        if (check.code === 803) {
          userStore.getAccount();
          clearInterval(timer);
          common_vendor.index.showToast({
            title: "登录成功,即将返回个人页面",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/mine/mine"
            });
          }, 1e3);
        }
      }, 2e3);
    }
    common_vendor.watch(
      () => loginMethod.value,
      () => {
        if (loginMethod.value === 2) {
          qrLogin();
        } else {
          clearInterval(timer);
        }
      },
      {
        immediate: true
      }
    );
    return (_ctx, _cache) => {
      return {
        a: phone.value,
        b: common_vendor.o(($event) => phone.value = $event.detail.value),
        c: captCha.value,
        d: common_vendor.o(($event) => captCha.value = $event.detail.value),
        e: common_vendor.o(sendCode),
        f: common_vendor.o(login),
        g: common_vendor.n({
          show: loginMethod.value === 0
        }),
        h: email.value,
        i: common_vendor.o(($event) => email.value = $event.detail.value),
        j: password.value,
        k: common_vendor.o(($event) => password.value = $event.detail.value),
        l: common_vendor.o(emailMethod),
        m: common_vendor.n({
          show: loginMethod.value === 1
        }),
        n: qrUrl.value,
        o: common_vendor.n({
          show: loginMethod.value === 2
        }),
        p: common_vendor.f(methods.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: item,
            c: common_vendor.o(($event) => loginMethod.value = index, item)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
