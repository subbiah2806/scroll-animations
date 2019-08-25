<template>
  <div v-if="!stopLoading">
    <div id="loading" ref="loading" class="loading">
      <div
        v-for="(item, index) in this.array"
        v-bind:key="index"
        class="box"
        v-bind:style="loadingStyle"
      ></div>
    </div>
  </div>
</template>

<script>
import { TimelineMax, Bounce } from "gsap/all";
import Vue from "vue";
import store from "../store";
import { mapGetters } from "vuex";

export default {
  name: "loading",
  props: {},
  data() {
    return {
      array: 0,
      loadingStyle: {
        width: "0px",
        height: " 0px"
      },
      grid: [0, 0],
      squareDia: 0,
      stopLoading: false,
      animateStop: false,
      animation: undefined
    };
  },
  computed: {
    ...mapGetters(["getLoading"])
  },
  watch: {
    getLoading(currentValue) {
      if (currentValue === "stop") {
        this.animateStop = true;
      } else if (currentValue === true) {
        this.stopLoading = false;
        Vue.nextTick(() => {
          this.performLoading();
        });
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      const clientWidth = window.innerWidth;
      const clientHeight = window.innerHeight;
      this.squareDia = Math.sqrt((clientWidth * clientHeight) / 100);
      const vertical = Math.ceil(clientHeight / this.squareDia);
      const horizontal = Math.ceil(clientWidth / this.squareDia);
      this.grid = [horizontal, vertical];
      this.array = Array.from({ length: horizontal * vertical }).map(
        (value, index) => index
      );
      this.loadingStyle.width = `${clientWidth / horizontal}px`;
      this.loadingStyle.height = `${clientHeight / vertical}px`;
      if (this.animation) {
        this.animation.kill();
        this.animation = undefined;
      }
      this.performLoading();
    },
    performLoading() {
      Vue.nextTick(() => {
        this.animation = new TimelineMax({
          repeat: -1,
          onRepeat: this.checkShouldStop
        });
        this.animation.from(".box", 1.5, { autoAlpha: 0 });
        this.animation.staggerTo(".box", 1, {
          scale: 0,
          yoyo: true,
          ease: Bounce,
          repeatDelay: 0.5,
          stagger: {
            grid: this.grid,
            from: "center",
            amount: 1
          }
        });
      });
    },
    checkShouldStop() {
      if (this.animateStop) {
        this.animation.stop();
        this.stopLoading = true;
        store.dispatch({
          type: "loading",
          payload: false
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/App.scss";
#loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $loading;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  align-content: flex-start;
  background-color: $backgroundColor;
}
.box {
  background: white;
}
</style>
