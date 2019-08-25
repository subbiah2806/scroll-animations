<template>
  <div id="pageNotFound">
    <span class="neg">ERROR 404</span>
    <br />
    <br />
    <p>The page is missing or never was written. You can wait and see if it becomes available again, or you can restart your computer.</p>
    <p class="leftAlign">
      * Send us an e-mail to notify this and try it later.
      <br />* Press SHIFT + B to restart the Application. You will
      <br />&nbsp; lose unsaved information in any programs that are running.
    </p>
    <br />Press any link to continue
    <div class="menu">
      <a class="aTagButton" href="/">
        <div class="textDefaultFormat">Home</div>
      </a>
      <a class="aTagButton" href="/">
        <div class="textDefaultFormat">go-back</div>
      </a>
    </div>
  </div>
</template>
<script>
import { TweenLite } from "gsap/all";
export default {
  name: "pageNotFound",
  mounted() {
    TweenLite.to(".hideOnInit", 0.5, {
      alpha: 1
    });
    const mousepointer = document.getElementById("mousePointer");
    if (mousepointer && mousepointer.classList) {
      mousepointer.classList.remove("mousepointerSmall");
    }
    document.addEventListener("keypress", e => {
      e = e || window.event;
      if (e.shiftKey && e.key === "B") {
        window.location = window.location.origin;
      }
    });
  }
};
</script>
<style lang="scss">
@import "@/App.scss";
#pageNotFound {
  padding: 20vh 10vw;
  height: 60vh;
  width: 80vw;
  background: #0000aa;
  color: #ffffff;
  font-family: courier;
  font-size: 12pt;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .blink {
    color: yellow;
  }
  .neg {
    background: #fff;
    color: #0000aa;
    padding: 2px 8px;
    font-weight: bold;
  }

  @media (max-width: 575.98px) {
  }
  @media (min-width: 576px) {
    .leftAlign {
      margin: 30px 100px;
      text-align: left;
    }
  }

  .menu {
    text-align: center;
    margin-top: 50px;
    a {
      margin: 0 10px;
    }
  }
}
</style>