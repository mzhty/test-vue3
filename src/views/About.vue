<template>
  <div>
    <video id="video"></video>
  </div>
</template>

<script>
import Hls from 'hls.js';
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (Hls.isSupported()) {
        var video = document.getElementById("video");
        var hls = new Hls();
        hls.loadSource(
          "http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8"
        );
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#video {
  width: 400px;
  height: 260px;
  border: 1px solid red;
}
</style>