<template>
  <div id="fullscreenmenu" class="fullscreenmenu">
    <div class="search">
      <span class="fa fa-search" v-on:click="focusInput"></span>
      <input placeholder="search astro.com" ref="search" />
      <ul>
        <li v-for="(list, index) in navLists" v-bind:key="index">
          <button v-on:click="updateRoute(list.text)" class="aTagButton">
            <span class="nav-txt textDefaultFormat">{{list.text}}</span>
          </button>
        </li>
      </ul>
      <div class="textDefaultFormat createdByCss">
        <span class="colorChange">created by</span>
        <a class="a space" v-img-tooltip:top="subbiahTooltip">Subbiah Chandramouli</a>
      </div>
    </div>
  </div>
</template>
<script>
import { imageToolTipOnHover } from "../App.directive";
export default {
  name: "fullscreenmenu",
  directives: {
    "img-tooltip": imageToolTipOnHover
  },
  data() {
    return {
      navLists: [
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
        }
      ],
      subbiahTooltip: {
        file: "subbiah.gif",
        right: "5vw",
        x: undefined,
        y: "0px"
      }
    };
  },
  methods: {
    focusInput() {
      this.$refs.search.focus();
    },
    updateRoute(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style lang="scss">
@import "@/App.scss";
#fullscreenmenu {
  display: none;
  background: black;
  z-index: $fullscreenmenu;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 44px;
  .search {
    position: relative;
    input {
      text-indent: 30px;
      border: 0;
      margin: 9px;
      height: 30px;
      width: calc(100% - 20px);
      font-size: 17px;
      line-height: 1.23543;
      font-weight: 400;
      letter-spacing: -0.022em;
      font-family: "SF Pro Text", "Myriad Set Pro", "SF Pro Icons",
        "Helvetica Neue", "Helvetica", "Arial", sans-serif;
      color: white;
      background-color: #333;
      &:focus {
        outline: none;
      }
    }
    .fa-search {
      position: absolute;
      top: 16px;
      left: 16px;
      font-size: 15px;
      color: white;
    }
  }
  ul {
    padding: 0;
    margin: 10px 10px;
    li {
      border-top: 1px solid gray;
      @media (max-width: 575.98px) {
        padding-left: 30px;
      }
      @media (min-width: 576px) {
        display: flex;
        justify-content: center;
      }
    }
  }
  .createdByCss {
    position: fixed;
    bottom: 5px;
    width: 100vw;
    display: flex;
    justify-content: center;
  }
  .space {
    margin-left: 5px;
  }
}
</style>