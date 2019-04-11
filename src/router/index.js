import Vue from "vue";
import Router from "vue-router";
import GoodsList from "@/views/goodsList";
import ShopCart from "@/views/ShopCart";

Vue.use(Router);

export default new Router({
    "routes": [
        {
            "path"     : "/",
            "name"     : "goodsList",
            "component": GoodsList
        },
        {
            "path"     : "/shopCart",
            "name"     : "shopCart",
            "component": ShopCart
        }
    ]
});
