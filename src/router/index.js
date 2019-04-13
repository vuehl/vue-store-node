import Vue from "vue";
import Router from "vue-router";
import GoodsList from "@/views/goodsList";
import ShopCart from "@/views/shopCart";
import Address from "@/views/address";
import OrderConfirm from "@/views/orderConfirm";
import OrderPayment from "@/views/orderPayment";
import OrderSuccess from "@/views/orderSuccess";
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
        },
        {
            "path"     : "/address",
            "name"     : "address",
            "component": Address
        },
        {
            "path"     : "/orderConfirm",
            "name"     : "orderConfirm",
            "component": OrderConfirm
        },
        {
            "path"     : "/orderPayment",
            "name"     : "orderPayment",
            "component": OrderPayment
        },
        {
            "path"     : "/orderSuccess",
            "name"     : "orderSuccess",
            "component": OrderSuccess
        }
    ]
});
