<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <div>
      <p>
        If iView is successfully added to this project, you'll see an
        <code v-text="'<Button>'"></code>
        below
      </p>
      <Button @click="getConsol" type="primary">Button</Button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="layout home-layout">
        <Layout style="height: 100%;">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <div class="logo" :class="logoClass">
                    <img src="./assets/logo.png" alt="">
                    <span>type + Vue</span>
                </div>
                <Menu active-name="1-2"  width="auto" :class="menuitemClasses">
                    <router-link to="/">
                        <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>主页</span>
                    </MenuItem>
                    </router-link>
                    <router-link to="/about">
                        <MenuItem name="1-2">
                            <Icon type="ios-search"></Icon>
                            <span>关于</span>
                        </MenuItem>
                    </router-link>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-settings"></Icon>
                            <span>Item 3</span>
                        </template>
                        <MenuItem name="3-1">Option 1</MenuItem>
                        <MenuItem name="3-2">Option 2</MenuItem>
                    </Submenu>
                    <!-- <MenuItem name="1-3">
                        <Icon type="ios-settings"></Icon>
                        <span>设置</span>
                    </MenuItem> -->
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar"  style="display:none">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue';
import { timerd, timerD } from './common/util';
export default {
  name: 'app',
  data() {
    return {
      isCollapsed: false,
    };
  },
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(timerd('-'));
  },
  computed: {
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : ''];
    },
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
    },
    logoClass() {
      return [this.isCollapsed ? 'logo-icon' : ''];
    },
  },
  methods: {
    getConsol() {
      // ts的接口验证在这没用了，可惜
      console.log(timerD({ a: 1, b: 2, mid_str: true }));
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
  },
};
</script>
<style lang='less'>
.home-layout {
  .collapsed-menu {
    &.ivu-menu-vertical {
      .ivu-menu-submenu-title {
        span {
          display: none;
        }
        .ivu-icon-ios-arrow-down {
          display: none;
        }
      }
      .ivu-menu-opened {
        position: relative;
        .ivu-menu {
          position: absolute;
          right: -116px;
          top: 10px;
          background-color: cadetblue;
        }
      }
    }
  }
}
</style>
 
<style scoped lang='less'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100%;
  .ivu-layout-sider,
  .ivu-menu {
    color: white;
    background: cadetblue;
    .ivu-menu-item {
      color: white;
      &:hover {
        color: aquamarine;
        // background-color: white;
      }
    }
  }
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.logo {
  height: 64px;
  line-height: 64px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  padding-left: 15px;
  img {
    width: 30px;
    height: 50%;
    vertical-align: middle;
  }
  span {
    color: white;
    font-size: 20px;
    margin-left: 15px;
  }
  &.logo-icon {
    text-align: center;
    padding: 0;
    span {
      display: none;
    }
  }
}
</style>
