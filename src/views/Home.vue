<template>
  <div id="Home" ref="Home">
    <section>
      <div class="section1 text-center">
        <div class="section1-scrollSkew makeIndependantAbs hideOnInit">
          <h1>LUNAR MAX</h1>
          <h1 class="h1-stroke title-stroke-abs">LUNAR MAX</h1>
          <div class="textDefaultFormat lineHeight Zindex1">
            APOLLO 50TH ANNIVERSARY
            <br />
            <a class="a" v-img-tooltip:top="subbiahTooltip">LIMITED EDITION</a>
            <br />200mm LUNAR
            <br />
            <a class="a" v-img-tooltip:down="subbiahTooltip">Our biggest model ever</a>
            <br />$499 USD
          </div>
        </div>
        <div class="textDefaultFormat scrollDown hideOnInit">
          SCROLL DOWN
          <i class="material-icons scrollDownArrow">keyboard_arrow_down</i>
        </div>
      </div>
      <div class="tenvh"></div>
      <div class="section2"></div>
      <div class="section3"></div>
      <div class="section4"></div>
    </section>
  </div>
</template>
<script>
/* eslint-disable */
import { TimelineLite, TimelineMax, Linear, TweenLite, Expo } from "gsap/all";
import { imageToolTipOnHover, guestNameAnimation } from "../App.directive";
import _ from "lodash";
export default {
  name: "Home",
  props: {},
  directives: {
    "img-tooltip": imageToolTipOnHover,
    "guest-name-animation": guestNameAnimation
  },
  data() {
    return {
      y: undefined,
      scrollAnimation: undefined,
      html: undefined,
      body: undefined,
      scroller: undefined,
      requestId: undefined,
      subbiahTooltip: {
        file: "subbiah.gif",
        right: "-20vw",
        top: "0vh",
        x: undefined,
        y: undefined
      },
      lastAnimation: false,
      mountedScroll: false,
      section4Text: [],
      sectop4Top: false,
      cursor: true,
      nobackground: false
    };
  },
  watch: {
    y: async function(to) {
      if (to >= 0) {
        let scrollPercentage = (to / this.clientHeight) * this.noOfScreens;
        this.scrollBarAnimation.progress(
          scrollPercentage / (this.noOfScreens - 1)
        );
        if (window.pageYOffset > this.stickyOffsetTop) {
          if (!this.sticky.className.split(" ").includes("sticky")) {
            this.sticky.classList.add("sticky");
          }
        } else {
          if (this.sticky.className.split(" ").includes("sticky")) {
            this.sticky.classList.remove("sticky");
          }
        }
        const minsticky = this.scrollImageOffsetTop - 44;
        if (window.pageYOffset > minsticky) {
          if (!this.scrollImage.className.split(" ").includes("stickyImage")) {
            this.scrollImage.classList.add("stickyImage");
          }
          const scrollImageAnimationProgress =
            (window.pageYOffset - minsticky) / 300;
          if (scrollImageAnimationProgress <= 1) {
            this.scrollImageAnimation.progress(scrollImageAnimationProgress);
          }
        } else {
          if (this.scrollImage.className.split(" ").includes("stickyImage")) {
            this.scrollImage.classList.remove("stickyImage");
          }
          this.scrollImageAnimation.progress(0);
        }
        if (scrollPercentage <= 1) {
          const section1ScrollBar = scrollPercentage / 0.25;
          if (this.section1ScrollBar && section1ScrollBar <= 1) {
            this.section1ScrollBar.progress(section1ScrollBar);
          }
          this.section1.progress(scrollPercentage);
        } else if (scrollPercentage > 1.1) {
        }
      }
    }
  },
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    this.addAnimations();
  },
  destroyed() {
    document.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    isnotmobile() {
      return window.innerWidth > 575.98;
    },
    addAnimations() {
      this.$nextTick(() => {
        this.sticky = document.querySelector(".sticky-nav");
        this.scrollImage = document.querySelector(".imagescroll");
        this.scrollImageOffsetTop = this.scrollImage.offsetTop;
        this.stickyOffsetTop = this.sticky.offsetTop;
        this.screenheight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        );
        this.clientHeight = document.body.clientHeight;
        this.noOfScreens = this.clientHeight / this.screenheight;
        const section1FaceIn = new TimelineLite({});
        this.$refs.Home.style.opacity = 1;
        const initAnimation = new TimelineLite();
        initAnimation
          .from(".section1", 2, {
            x: -2000,
            y: -2000,
            scale: 20,
            ease: Power2.easeOuts
          })
          .to(".hideOnInit", 0.5, {
            alpha: 1
          });
        TweenLite.to(".makeIndependantAbs", 0.1, {
          skewY: "0deg",
          rotation: 0.01
        });
        this.section1 = new TimelineLite({ paused: true });
        this.section1.to(".section1-scrollSkew", 0.1, {
          skewY: "12deg",
          autoAlpha: 0,
          rotation: 0.01
        });
        this.section1ScrollBar = new TimelineLite({ paused: true });
        this.section1ScrollBar.to(".scrollDown", 0.1, {
          y: -50,
          autoAlpha: 0,
          rotation: 0.01
        });
        this.scrollBarAnimation = new TimelineLite({ paused: true });
        this.scrollBarAnimation.to(".scrollbar-track", 0.1, { y: "17vh" });
        this.scrollImageAnimation = new TimelineLite({ paused: true });
        this.scrollImageAnimation.to(".imagescroll", 0.1, {
          scale: 0.9
        });
        this.customScroll();
        function sample(list) {
          return function() {
            return list[Math.floor(Math.random() * list.length)];
          };
        }
        function random(min, max) {
          if (max == null) {
            max = min;
            min = 0;
          }
          return function() {
            return Math.random() * (max - min) + min;
          };
        }
        var colors = ["#1af890", "#DF0A0A", "#5219AA", "#7E0DC9", "#CF368D"];
        var tl = new TimelineMax({ repeat: -1 });
        for (let i = 0; i < 25; i++) {
          // use colorChange this class to change color of text randomly.
          tl.to(".colorChange", 1, {
            webkitTextStrokeColor: sample(colors),
            repeatDelay: 1,
            alpha: random(0.6, 1),
            ease: Expo.easeOut
          });
        }
      });
    },
    customScroll() {
      this.html = document.documentElement;
      this.body = document.body;

      this.scroller = {
        target: document.querySelector("#Home"),
        ease: 0.1, // <= scroll speed
        endY: 0,
        resizeRequest: 1,
        scrollRequest: 0
      };
      this.y = 0;
      this.requestId = null;

      TweenLite.set(this.scroller.target, {
        rotation: 0.01,
        force3D: true
      });
      this.updateScroller();
      const throttleScroll = _.throttle(this.onScroll, 100, {
        trailing: false
      });
      document.addEventListener("scroll", throttleScroll, true);
    },
    onScroll() {
      this.scroller.scrollRequest++;
      if (!this.requestId) {
        this.requestId = requestAnimationFrame(this.updateScroller);
      }
    },
    updateScroller() {
      var resized = this.scroller.resizeRequest > 0;

      if (resized) {
        var height = this.scroller.target.clientHeight;
        this.body.style.height = height + "px";
        this.scroller.resizeRequest = 0;
      }

      var scrollY =
        window.pageYOffset || this.html.scrollTop || this.body.scrollTop || 0;

      this.scroller.endY = scrollY;
      this.y += (scrollY - this.y) * this.scroller.ease;

      if (Math.abs(scrollY - this.y) < 0.05 || resized) {
        this.y = scrollY;
        this.scroller.scrollRequest = 0;
      }
      const screenWidth = window.innerWidth;
      if (screenWidth && screenWidth < 575.98) {
        TweenLite.set(this.scroller.target, {
          y: -this.y
        });
      }
      this.requestId =
        this.scroller.scrollRequest > 0
          ? requestAnimationFrame(this.updateScroller)
          : null;
    }
  }
};
</script>
<style lang="scss">
@import "@/App.scss";
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes inner-bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0);
  }
}
@import url("https://fonts.googleapis.com/css?family=Righteous&display=swap");
#Home {
  opacity: 0;
  width: 100%;
  transition: opacity 1s linear;
  @media (max-width: 575.98px) {
    position: fixed;
  }
  @media (min-width: 576px) {
    display: flex;
    flex-direction: column;
  }
  overflow: hidden;
  .fullHeight {
    height: 100vh;
  }
  @mixin spaceBetween {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .section1 {
    height: calc(100vh - 20vh - 20px);
    @media (max-width: 575.98px) {
      padding: 20vh 10vw 70px 10vw;
    }
    @media (min-width: 576px) {
      padding: 20vh 20vw 20px 10vw;
    }
    background-image: url(../assets/moon1.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    @include spaceBetween;
    .section1-scrollSkew {
      display: flex;
      flex-direction: column;
    }
    .Zindex1 {
      position: relative;
      z-index: 1;
    }
    .title-stroke-abs {
      position: absolute;
      width: 100%;
      z-index: 1;
      left: 0;
      top: 0;
    }
    .heading1-child {
      color: $primary;
      font-size: 0.3em;
      font-weight: 300;
      text-align: right;
    }
    .lineHeight {
      line-height: 1.7em;
    }
    .scrollDown {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: $secondary;
      animation: 1s cubic-bezier(0.64, 0.15, 0.32, 0.9) infinite bounce;
      .scrollDownArrow {
        animation: 1s cubic-bezier(0.64, 0.15, 0.32, 0.9) infinite inner-bounce;
      }
    }
  }
  .tenvh {
    height: 10vh;
  }
  .section2 {
    height: 100vh;
  }
  .section3 {
    height: 100vh;
  }
  .section4 {
    height: 100vh;
  }
}
</style>