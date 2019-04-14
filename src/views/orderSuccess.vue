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
            <li class="cur"><span>Order</span> confirmation</li>
            </ul>
        </div>

        <div class="order-create">
            <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
            <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
                <span>Order ID：{{ this.orderId}}</span>
                <span>Order total：{{ this.orderTotal }}</span>
            </p>
            <div class="order-create-btn-wrap">
                <div class="btn-l-wrap">
                    <a class="btn btn--m">
                        <router-link to="/shopCart">
                            Cart List
                        </router-link>
                    </a>
                </div>
                <div class="btn-r-wrap">
                    <a class="btn btn--m">
                        <router-link to="/">
                            Goods List
                        </router-link>
                    </a>
                </div>
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
            let data = {
                "userId"    : JSON.parse(userGroup).userId,
                "orderTotal": this.$route.query.orderTotal,
                "addressId" : this.$route.query.addressId
            };
            console.log(data);
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
