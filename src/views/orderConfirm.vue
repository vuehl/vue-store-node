<template>
<div>
    <nav-header />
    <div class="nav-breadcrumb-wrap">
        <div class="container">
        <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <span>Order Confirm</span>
        </nav>
        </div>
    </div>
    <div class="container">
        <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <div class="checkout-order">
            <!-- process step -->
            <div class="check-step">
                <ul>
                <li class="cur"><span>Confirm</span> address</li>
                <li class="cur"><span>View your</span> order</li>
                <li><span>Make</span> payment</li>
                <li><span>Order</span> confirmation</li>
                </ul>
            </div>

            <!-- order list -->
            <div class="page-title-normal checkout-title">
                <h2><span>Order content</span></h2>
            </div>
            <div class="item-list-wrap confirm-item-list-wrap">
                <div class="cart-item order-item">
                    <div class="cart-item-head">
                        <ul>
                            <li>Order contents</li>
                            <li>Price</li>
                            <li>Quantity</li>
                            <li>Subtotal</li>
                        </ul>
                    </div>
                    <ul class="cart-item-list">
                        <li v-for="(item, index) in shopCartList" v-if="item.checked == 1" :key="item.productId + index">
                            <div class="cart-tab-1">
                                <div class="cart-item-pic">
                                    <img :src="'/static/'+item.productImage" alt="XX">
                                </div>
                                <div class="cart-item-title">
                                <div class="item-name">{{ item.productName }}</div>

                                </div>
                            </div>
                            <div class="cart-tab-2">
                                <div class="item-price">￥ {{ item.salePrice }}</div>
                            </div>
                            <div class="cart-tab-3">
                                <div class="item-quantity">
                                <div class="select-self">
                                    <div class="select-self-area">
                                    <span class="select-ipt">×{{ item.productNum }}</span>
                                    </div>
                                </div>
                                <div class="item-stock item-stock-no">In Stock</div>
                                </div>
                            </div>
                            <div class="cart-tab-4">
                                <div class="item-price-total">￥ {{ item.salePrice * item.productNum }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Price count -->
            <div class="price-count-wrap">
                <div class="price-count">
                    <ul>
                        <li>
                            <span>Item subtotal:</span>
                            <span>￥ {{ this.itemSubtotal }}</span>
                        </li>
                        <li>
                            <span>Shipping:</span>
                            <span>￥ {{ this.shipping }}</span>
                        </li>
                        <li>
                            <span>Discount:</span>
                            <span>￥ {{ this.discount }}</span>
                        </li>
                        <li>
                            <span>Tax:</span>
                            <span>￥ {{ this.tax }}</span>
                        </li>
                        <li class="order-total-price">
                            <span>Order total:</span>
                            <span>￥ {{ this.orderTotal }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="order-foot-wrap">
                <div class="prev-btn-wrap">
                    <a class="btn btn--m">
                        <router-link to="/address">
                            Previous
                        </router-link>
                    </a>
                </div>
                <div class="next-btn-wrap">
                    <button class="btn btn--m btn--red">
                        <router-link :to="{'path': '/OrderPayment', 'query': {'orderTotal': this.orderTotal, 'addressId': this.addressId}}">
                            Proceed to payment
                        </router-link>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <nav-footer />
</div>
</template>
<script>
import NavHeader from "@/components/header";
import NavFooter from "@/components/footer";
import "@/assets/css/font-awesome.min.css";
import axios from "axios";

export default {
    data () {
        return {
            shopCartList: [],
            itemSubtotal: 0,
            shipping    : 100,
            discount    : 200,
            tax         : 400,
            orderTotal  : 0,
            addressId   : ""
        };
    },
    mounted () {
        this.init();
    },
    components: {
        NavHeader,
        NavFooter
    },
    methods: {
        init () {
            let userGroup = sessionStorage.getItem("userGroup");
            if (!userGroup) {
                return;
            }
            let data = {
                "userId": JSON.parse(userGroup).userId
            };
            axios.post("/users/shopCartList", 
                data
                ,{
                    "Content-Type": "application/x-www-form-urlencoded"
                }).then((response, reject) => {
                let res = response.data;
                if (res.status === "0") {
                    this.shopCartList = res.result;
                    let itemSubtotal = 0;
                    res.result.forEach(function (item) {
                        if (item.checked == 1) {
                            itemSubtotal += item.productNum * item.salePrice;
                        }
                    });
                    this.itemSubtotal = itemSubtotal;
                    this.orderTotal = itemSubtotal + this.shipping - this.discount + this.tax;
                    this.addressId = this.$route.query.addressId;
                }
            });
        },
    }
}
</script>
