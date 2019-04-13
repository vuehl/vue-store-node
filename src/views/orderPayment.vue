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
                    <a class="btn btn--m">Previous</a>
                </div>
                <div class="next-btn-wrap">
                    <button class="btn btn--m btn--red">Proceed to payment</button>
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
            addressList: []
        };
    },
    components: {
        NavHeader,
        NavFooter
    },
    methods: {
    }
}
</script>
