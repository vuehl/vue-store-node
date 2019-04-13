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
                        <li>
                        <div class="cart-tab-1">
                            <div class="cart-item-pic">
                            <img src="/static/1.jpg" alt="XX">
                            </div>
                            <div class="cart-item-title">
                            <div class="item-name">XX</div>

                            </div>
                        </div>
                        <div class="cart-tab-2">
                            <div class="item-price">199</div>
                        </div>
                        <div class="cart-tab-3">
                            <div class="item-quantity">
                            <div class="select-self">
                                <div class="select-self-area">
                                <span class="select-ipt">×5</span>
                                </div>
                            </div>
                            <div class="item-stock item-stock-no">In Stock</div>
                            </div>
                        </div>
                        <div class="cart-tab-4">
                            <div class="item-price-total">5000</div>
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
                        <span>5000</span>
                        </li>
                        <li>
                        <span>Shipping:</span>
                        <span>30</span>
                        </li>
                        <li>
                        <span>Discount:</span>
                        <span>100</span>
                        </li>
                        <li>
                        <span>Tax:</span>
                        <span>300</span>
                        </li>
                        <li class="order-total-price">
                        <span>Order total:</span>
                        <span>5230</span>
                        </li>
                    </ul>
                </div>
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
