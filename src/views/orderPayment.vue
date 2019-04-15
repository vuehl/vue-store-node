<template>
<div>
    <nav-header />
    <div class="container">
        <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
            <ul>
                <li class="cur"><span>Confirm</span> address</li>
                <li class="cur"><span>View your</span> order</li>
                <li class="cur"><span>Make</span> payment</li>
                <li><span>Order</span> confirmation</li>
            </ul>
        </div>

        <div class="order-foot-wrap">
            <div class="prev-btn-wrap">
                <a class="btn btn--m">
                    <router-link to="/OrderConfirm">
                        Previous
                    </router-link>
                </a>
            </div>
            <div class="next-btn-wrap">
                <button class="btn btn--m btn--red">
                    <router-link :to="{'path': '/OrderSuccess', 'query': {'orderTotal': this.orderTotal, 'orderId': this.orderId}}">
                        Proceed to payment
                    </router-link>
                </button>
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
            orderTotal: 0,
            orderId   : ""
        };
    },
    components: {
        NavHeader,
        NavFooter
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            let userGroup = sessionStorage.getItem("userGroup");
            if (!userGroup) {
                return;
            }
            let data = {
                "userId"    : JSON.parse(userGroup).userId,
                "orderTotal": this.$route.query.orderTotal,
                "addressId" : this.$route.query.addressId
            };
            axios.post("/users/orderSuccess", data, {
                "Content-Type": "application/x-www-form-urlencoded"
            }).then((response) => {
                let res = response.data;
                if (res.status == 0) {
                    this.orderTotal = res.result.orderTotal;
                    this.orderId = res.result.orderId;
                }
            });
        }
    }
}
</script>
