<template>
  <div id="app">
    <loading />
    <div v-if="isloading === false">
      <div v-if="isnotmobile()" class="mousepointer hideOnInit" id="mousePointer"></div>
      <div v-if="headerMenu">
        <div class="scrollBar hideOnInit">
          <div class="scrollbar-track"></div>
        </div>
        <div class="topNavBars hideOnInit">
          <nav class="first-nav">
            <div class="margin">
              <ul>
                <li v-for="(list, index) in navLists" v-bind:key="index">
                  <button
                    v-hover-on-a-tag
                    v-on:click="updateRoute(list.text)"
                    v-if="!list.img"
                    class="aTagButton"
                  >
                    <span v-if="list.text" class="nav-txt textDefaultFormat">{{list.text}}</span>
                  </button>
                  <button
                    v-hover-on-img-tag
                    v-on:click="updateRoute(list.text)"
                    class="aTagButton"
                    v-if="list.img"
                  >
                    <img v-if="list.img" :src="list.img" class="nav-img" />
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          <nav class="sticky-nav">
            <div class="margin">
              <div class="heading textDefaultFormat">LUNAR MAX</div>
              <div>
                <ul>
                  <li v-for="(list, index) in stickyNavLists" v-bind:key="index">
                    <button
                      v-on:click="updateRoute(list.text)"
                      :class="list.button ? 'button': 'aTagButton'"
                    >
                      <span v-if="list.text" class="nav-txt textDefaultFormat">{{list.text}}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div
          class="Home-right hideOnInit"
          @mouseover="menuAnimate(true)"
          @mouseleave="menuAnimate(false)"
        ></div>
        <div class="follower hideOnInit">
          <div class="dash dash-top"></div>
          <div class="dash dash-bottom"></div>
        </div>
      </div>
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import loading from "./components/loading.vue";
import store from "./store";
import { mapGetters, mapActions } from "vuex";
import {
  TweenLite,
  TweenMax,
  Back,
  Sine,
  TimelineMax,
  Power2,
  TextPlugin,
  CSSPlugin
} from "gsap/all";
import astrologo from "./assets/astro-logo.png";
import menubag from "./assets/img-menu-bag.png";
import { hoverOnATag, hoverOnImgTag } from "./App.directive";
export default {
  name: "app",
  directives: {
    "hover-on-a-tag": hoverOnATag,
    "hover-on-img-tag": hoverOnImgTag
  },
  components: {
    loading
  },
  data() {
    return {
      navLists: [
        {
          img: astrologo
        },
        {
          text: "PLANET"
        },
        {
          text: "NOTEBOOK"
        },
        {
          text: "GIFTS"
        },
        {
          text: "COLLABORATION"
        },
        {
          text: "EDUCATION"
        },
        {
          text: "OUR STORY"
        },
        {
          img: menubag,
          text: "cart"
        }
      ],
      stickyNavLists: [
        {
          text: "TIMELINE"
        },
        {
          text: "INFO"
        },
        {
          text: "SPECS"
        },
        {
          button: true,
          text: "BUY"
        }
      ],
      transitionName: undefined,
      isloading: true,
      moveTrg: undefined,
      headerMenu: true
    };
  },
  computed: {
    ...mapGetters(["getLoading"]),
    ...mapActions(["loading"])
  },
  mounted() {
    this.checkHeader();
    // eslint-disable-next-line
    const plugins = [TextPlugin, CSSPlugin];
    setTimeout(() => {
      store.dispatch({
        type: "loading",
        payload: "stop"
      });
    }, 1);
  },
  destroyed() {
    window.removeEventListener("mousemove", e => this.moveCircle(e));
  },
  methods: {
    moveCircle(e) {
      TweenLite.to("#mousePointer", 0.5, {
        css: {
          x: e.clientX,
          y: e.clientY
        },
        ease: Power2.easeOuts
      });
      if (this.headerMenu) {
        if (this.moveMenu) {
          TweenMax.to(".follower", 0.5, {
            x: e.clientX,
            y: e.clientY,
            ease: Sine.easeOut
          });
          if (!this.increasedmousePointer) {
            this.increasedmousePointer = true;
            TweenMax.to("#mousePointer", 0.5, {
              scale: 1.5,
              background: "white"
            });
          }
        } else {
          this.increasedmousePointer = false;
          const menu = new TimelineMax({ paused: true });
          menu
            .to(".follower", 1, {
              x: this.center.x,
              y: this.center.y,
              ease: Back.easeOut
            })
            .to(
              "#mousePointer",
              0.5,
              {
                scale: 1
              },
              0
            );
          menu.play();
        }
      }
    },
    isnotmobile() {
      return window.innerWidth > 575.98;
    },
    menuAnimate(animate) {
      if (this.isnotmobile()) {
        if (animate) {
          this.menu.play();
          this.moveMenu = true;
        } else {
          this.menu.reverse();
          this.moveMenu = false;
        }
      }
    },
    updateRoute(route) {
      this.$router.push(route);
    },
    checkHeader() {
      const to = this.$route;
      this.headerMenu =
        (to.matched &&
          to.matched[0] &&
          to.matched[0].props &&
          to.matched[0].props.default &&
          to.matched[0].props.default.headerMenu) === false
          ? false
          : true;
    }
  },
  watch: {
    $route(to, from) {
      this.checkHeader();
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
    getLoading(currentValue) {
      this.isloading = currentValue;
    },
    isloading(value) {
      if (value === false) {
        this.$nextTick(() => {
          if (this.headerMenu) {
            const menuContainer = document.querySelector(".Home-right");
            const menuContainerRect = menuContainer.getBoundingClientRect();
            this.center = {
              x: menuContainerRect.right - menuContainerRect.width / 2,
              y: menuContainerRect.top + menuContainerRect.height / 2
            };
            TweenMax.to(".follower", 0.1, {
              x: this.center.x,
              y: this.center.y,
              ease: Back.easeOut
            });
            this.menu = new TimelineMax({ paused: true });
            this.menu.to(".dash-top", 0.1, {
              rotation: 90,
              y: 5
            });
            this.menu
              .to(
                ".dash-bottom",
                0.1,
                {
                  y: -5
                },
                0
              )
              .to(".dash", 0.1, {
                rotation: "+=360"
              });
          }
          if (this.isnotmobile()) {
            window.addEventListener("mousemove", this.moveCircle, true);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/App.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media (min-width: 576px) {
    cursor: none;
  }
  .Home-right {
    position: fixed;
    z-index: $Home-right;
    border-radius: 80%;
    mix-blend-mode: exclusion;
    @media (max-width: 575.98px) {
      width: 55px;
      height: 55px;
      margin: -27.5px 0 0 -27.5px;
      top: 50vh;
      right: 0;
    }
    @media (min-width: 576px) {
      width: 100px;
      height: 100px;
      margin: -50px 0 0 -50px;
      top: 140px;
      right: 15px;
    }
  }
  .follower {
    z-index: $follower;
    position: fixed;
    mix-blend-mode: exclusion;
    top: 0;
    left: 0;
    border-radius: 80%;
    background: hsl(0, 0%, 98%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 575.98px) {
      width: 40px;
      height: 40px;
      margin: -20px 0 0 -20px;
    }
    @media (min-width: 576px) {
      width: 55px;
      height: 55px;
      margin: -27.5px 0 0 -27.5px;
    }
    .dash {
      height: 2px;
      margin-top: 5px;
      margin-bottom: 5px;
      background-color: #111;
      @media (max-width: 575.98px) {
        width: 15px;
      }
      @media (min-width: 576px) {
        width: 20px;
      }
    }
  }
  .mousepointer {
    position: fixed;
    pointer-events: none;
    z-index: $mousepointer;
    border-radius: 80%;
  }
  #mousePointer {
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    margin: -40px 0 0 -40px;
    border: 1px solid $primary;
    mix-blend-mode: exclusion;
    backface-visibility: hidden;
    background: white;
  }
  .mousepointerSmall {
    top: 0;
    left: 0;
    width: 10px !important;
    height: 10px !important;
    margin: -5px 0 0 -5px !important;
    mix-blend-mode: normal !important;
    border: 0 !important;
    backface-visibility: hidden;
    background: black !important;
  }
  .scrollBar {
    position: fixed;
    z-index: $scrollBar;
    height: 19.9vh;
    width: 1px;
    top: auto;
    left: auto;
    mix-blend-mode: exclusion;
    background-color: $primary;
    @media (max-width: 575.98px) {
      right: 10px;
      bottom: 50px;
    }
    @media (min-width: 576px) {
      right: 50px;
      bottom: 50px;
    }
    .scrollbar-track {
      width: 1px;
      height: 3vh;
      background-color: $backgroundColor;
    }
  }
  @mixin navMargin {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 22px;
    height: 100%;
  }
  @mixin commonUl {
    ul {
      height: 100%;
      @include spaceBetween;
      list-style: none;
      margin: 0;
      padding: 0;
      width: auto;
      li {
        height: 100%;
        display: inline-block;
        position: relative;
        list-style: none;
        vertical-align: top;
        a {
          height: 100%;
          color: white;
          padding: 0 10px;
          .nav-txt {
            padding: 5px 6px;
            font-size: 14px;
            line-height: 3.14286;
            font-weight: 400;
            letter-spacing: -0.01em;
            font-family: "Righteous", cursive;
            opacity: 0.8;
          }
          .nav-img {
            height: 20px;
            width: auto;
            filter: brightness(1.7);
          }
        }
      }
    }
  }
  @mixin spaceBetween {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .topNavBars {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: $topNavBars;
    .first-nav {
      background: rgb(91, 85, 85);
      width: 100%;
      height: 44px;
      .margin {
        @include navMargin;
        @include commonUl;
      }
    }
    .sticky-nav {
      background: black;
      width: 100%;
      height: 44px;
      .margin {
        @include navMargin;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .heading {
          height: 24px;
        }
        @include commonUl;
        ul {
          padding-top: 5px;
        }
        .button {
          margin-top: -1px;
          font-size: 12px;
          border-color: #07c;
          background: linear-gradient(#42a1ec, #0070c9);
          border-width: 0;
          border-radius: 12px;
          padding: 4px 12px;
          margin-left: 20px;
          &:focus {
            background: #763edf;
          }
        }
        .nav-txt {
          font-size: 13px !important;
          opacity: 1 !important;
          font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue",
            "Helvetica", "Arial", sans-serif !important;
        }
      }
    }
  }
}
</style>
