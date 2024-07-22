"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const services_index = require("../../services/index.js");
const store_musicInfo = require("../../store/musicInfo.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "audio",
  setup(__props) {
    const curIndex = common_vendor.ref(4);
    common_vendor.ref("");
    const songDetail = common_vendor.ref(null);
    const audioManager = common_vendor.index.createInnerAudioContext();
    audioManager.autoplay = true;
    const isPlay = common_vendor.ref(true);
    let timeAfter;
    const duration = common_vendor.ref(0);
    const currentTime = common_vendor.ref(0);
    const useStore = store_musicInfo.useMusicStore();
    useStore.getSongs().then(() => {
      songDetail.value = useStore.playList[curIndex.value];
      console.log(songDetail.value);
      console.log(songDetail.value.al.picUrl);
      common_vendor.watch(
        () => songDetail.value,
        async () => {
          var _a, _b, _c;
          common_vendor.index.setNavigationBarTitle({
            title: (_a = songDetail.value) == null ? void 0 : _a.name
          });
          const isWork = await services_index.songCheck((_b = songDetail.value) == null ? void 0 : _b.al.id);
          console.log(88888888, isWork);
          if (!isWork.success) {
            common_vendor.index.showToast({
              title: isWork.message,
              icon: "fail"
            });
            timeAfter = setTimeout(() => {
              common_vendor.index.hideToast();
              clearTimeout(timeAfter);
            }, 1e3);
            return;
          }
          const res = await services_index.singleSong((_c = songDetail.value) == null ? void 0 : _c.al.id);
          console.log(9999999, res, res.data[0].url);
          audioManager.src = res.data[0].url;
          audioManager.onCanplay(() => {
            duration.value = audioManager.duration;
            currentTime.value = audioManager.currentTime;
            audioManager.play();
          });
        },
        {
          deep: true,
          immediate: true
        }
      );
      common_vendor.watch(
        () => curIndex.value,
        () => {
          common_vendor.index.hideToast();
          clearTimeout(timeAfter);
          songDetail.value = useStore.playList[curIndex.value];
        },
        {
          immediate: true
        }
      );
    });
    const playBtnSrc = common_vendor.computed(() => {
      return isPlay.value ? "../../static/icon/zanting.png" : "../../static/icon/bofang.png";
    });
    const playPause = () => {
      isPlay.value = !isPlay.value;
      if (audioManager.paused) {
        audioManager.play();
        return;
      }
      audioManager.pause();
    };
    const changeCurSong = (num) => {
      curIndex.value += num;
    };
    const zero = (num) => num >= 10 ? num : "0" + num;
    const formatTime = (num) => `${zero(Math.floor(num / 60))}:${zero(parseInt(num % 60))}`;
    audioManager.onTimeUpdate(() => {
      currentTime.value = audioManager.currentTime;
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: `url(${(_a = songDetail.value) == null ? void 0 : _a.al.picUrl})`,
        b: (_b = songDetail.value) == null ? void 0 : _b.al.picUrl,
        c: common_vendor.n({
          animate: isPlay.value
        }),
        d: common_vendor.p({
          type: "heart",
          size: "40",
          color: "#ffffff"
        }),
        e: common_vendor.p({
          type: "chat",
          size: "40",
          color: "#ffffff"
        }),
        f: common_vendor.t(formatTime(currentTime.value)),
        g: currentTime.value / duration.value * 100,
        h: common_vendor.t(formatTime(duration.value)),
        i: common_vendor.unref(audioManager).loop
      }, common_vendor.unref(audioManager).loop ? {
        j: common_assets._imports_0
      } : {
        k: common_vendor.p({
          type: "loop",
          color: "#ffffff"
        })
      }, {
        l: common_vendor.o(($event) => changeCurSong(-1)),
        m: common_vendor.p({
          type: "arrow-left",
          color: "#ffffff"
        }),
        n: playBtnSrc.value,
        o: common_vendor.o(playPause),
        p: common_vendor.o(($event) => changeCurSong(1)),
        q: common_vendor.p({
          type: "arrow-right",
          color: "#ffffff"
        }),
        r: common_vendor.p({
          type: "list",
          color: "#ffffff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-57f07fec"]]);
wx.createPage(MiniProgramPage);
