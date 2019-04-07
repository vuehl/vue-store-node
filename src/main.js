// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import GoodsList from "./views/goodsList";
import VueLazyLoad from "vue-lazyload";
import infiniteScroll from "vue-infinite-scroll";
import router from "./router";

Vue.config.productionTip = false;

// 这个是要对我们一开始懒加载的图片地址
Vue.use(VueLazyLoad, {
    loading: "./../static/loading/loading-bars.svg"
});
Vue.use(infiniteScroll);

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: {
        GoodsList
    },
    template: "<GoodsList />"
});
