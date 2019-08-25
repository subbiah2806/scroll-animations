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
            <a class="a" v-img-tooltip:top="moonTooltip">LIMITED EDITION</a>
            <br />200mm LUNAR
            <br />
            <a class="a" v-img-tooltip:down="moonTooltip2">Our biggest model ever</a>
            <br />$499 USD
          </div>
        </div>
        <div class="textDefaultFormat scrollDown hideOnInit">
          SCROLL DOWN
          <i class="material-icons scrollDownArrow">keyboard_arrow_down</i>
        </div>
      </div>
      <div class="tenvh"></div>
      <div class="imgscroll-text" v-for="(text, index) in scrollText" v-bind:key="index">
        <h3>{{text}}</h3>
        <h3 class="bottom-space">{{text}}</h3>
      </div>
    </section>
    <div class="imagescroll hideOnInit">
      <div :class="scrollImages.includes('image1') ? '':'hide'" class="image image1" ref="image1"></div>
      <div :class="scrollImages.includes('image2') ? '':'hide'" class="image image2" ref="image2"></div>
      <div :class="scrollImages.includes('image3') ? '':'hide'" class="image image3" ref="image3"></div>
    </div>
  </div>
</template>
<script>
import { TimelineLite, TimelineMax, TweenLite, Expo, Power2 } from "gsap/all";
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
      moonTooltip: {
        file: "moongif.gif",
        right: "-20vw",
        top: "0vh",
        x: undefined,
        y: undefined
      },
      moonTooltip2: {
        file: "moongif2.gif",
        left: "0",
        top: "0",
        x: undefined,
        y: undefined
      },
      lastAnimation: false,
      mountedScroll: false,
      section4Text: [],
      sectop4Top: false,
      cursor: true,
      nobackground: false,
      scrollImages: ["image1", "image2", "image3"],
      scrollText: [
        `Using the most accurate industrial 3D printing technology available today, LUNAR is modeled to 0.006 millimeters per pixel precision, based on data captured by NASA's Lunar Reconnaissance Orbiter.`,
        `Printing level height down to 0.05 millimeters
          Printing error precision of 0.025 millimeters
          Up to 0.006 millimeters per pixel precision 3D printing accuracy
          98%+ modeling accuracy achieved through
          `,
        `The Lunar Moon has captivated the human imagination throughout history. Though it is ever present, there is so little we know. We wanted to bring the Moon closer, to bring all of our stargazing dreams into reality. Our mission is to inspire as many space lovers as we can, helping to awaken and educate a new generation of astronomy enthusiasts through the power of technology`
      ]
    };
  },
  watch: {
    y: async function(to) {
      if (to >= 0) {
        const yHeight = window.pageYOffset;
        let scrollPercentage = (to / this.clientHeight) * this.noOfScreens;
        this.scrollBarAnimation.progress(
          scrollPercentage / (this.noOfScreens - 1)
        );
        if (yHeight > this.stickyOffsetTop) {
          if (!this.sticky.className.split(" ").includes("sticky")) {
            this.sticky.classList.add("sticky");
          }
        } else {
          if (this.sticky.className.split(" ").includes("sticky")) {
            this.sticky.classList.remove("sticky");
          }
        }
        const minsticky = this.scrollImageOffsetTop - 44;
        if (yHeight > minsticky) {
          if (!this.scrollImage.className.split(" ").includes("stickyImage")) {
            this.scrollImage.classList.add("stickyImage");
          }
          const scrollPercentage =
            ((yHeight - minsticky) /
              (this.clientHeight - this.screenheight - minsticky)) *
            3;
          this.scrollImageAnimation.progress(scrollPercentage / 3);
          if (scrollPercentage <= 0.7) {
            this.scrollImages = ["image1", "image2", "image3"];
          } else if (scrollPercentage > 1 && scrollPercentage <= 2) {
            this.scrollImages = ["image1", "image2"];
          } else if (scrollPercentage > 2) {
            this.scrollImages = ["image1"];
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
        }
      }
    }
  },
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    if (!this.isnotmobile()) {
      this.moonTooltip.top = undefined;
      this.moonTooltip.y = 0;
      this.moonTooltip.right = "0vw";
      this.moonTooltip2.top = undefined;
      this.moonTooltip2.y = -50;
      this.moonTooltip2.left = "0vw";
    }
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
        this.scrollImageSessionHeight =
          this.clientHeight - this.scrollImageOffsetTop;
        this.noOfScrollScreen =
          this.scrollImageSessionHeight / this.screenheight;
        this.noOfScreens = this.clientHeight / this.screenheight;
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
          scale: 0.8
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
      @media (max-width: 575.98px) {
        margin-bottom: 60px;
      }
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
  .imgscroll-text {
    height: 200vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      margin: 0 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    .bottom-space {
      visibility: hidden;
    }
  }
  .imagescroll {
    position: absolute;
    top: 110vh;
    height: calc(100vh - 44px);
    width: 100%;
    z-index: -1;
    .image {
      height: calc(100vh - 44px);
      width: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      transition: opacity 0.5s linear;
    }
    .image1 {
      background-image: url(../assets/moon2.png);
    }
    .image2 {
      background-image: url(../assets/moon3.png);
    }
    .image3 {
      background-image: url(../assets/moon4.png);
    }
  }
}
</style>