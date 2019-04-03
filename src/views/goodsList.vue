<template>
<div>
    <nav-header />
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
                <a href="/">Home</a>
                <span>Goods</span>
            </nav>
        </div>
    </div>
    <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)" :class="{'cur': priceChecked === 'all'}"  @click="priceChecked='all'">All</a></dd>
                        <dd v-for="(item, index) in priceFilter" :key="index">
                            <a href="javascript:void(0)"  @click="setPriceFilter(index)" :class="{'cur': priceChecked===index}">{{ item.startPrice }} - {{ item.endPrice }}</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="item in goodsList" :key="item.productId">
                                <div class="pic">
                                    <a href="#"><img v-lazy="'static/'+item.prodcutImg" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{ item.productName }}</div>
                                    <div class="price">{{ item.prodcutPrice }}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="md-overlay" v-show="overlayFlag" @click="closePop"></div>
    <nav-footer />
</div>
</template>

<script>
import NavHeader from "@/components/header";
import NavFooter from "@/components/footer";
import axios from "axios";
import "@/assets/css/base.css";
import "@/assets/css/checkout.css";
import "@/assets/css/login.css";
import "@/assets/css/product.css";
export default {
    data () {
        return {
            goodsList: [],
            priceFilter: [
                {
                    startPrice: "0.00",
                    endPrice: '500.00'
                },
                {
                    startPrice: "500.00",
                    endPrice: "1000.00"
                },
                {
                    startPrice: "1000.00",
                    endPrice: "1500.00"
                },
                {
                    startPrice: "1500.00",
                    endPrice: "2000.00"
                },
                {
                    startPrice: "2000.00",
                    endPrice: "2500.00"
                }
            ],
            priceChecked: "all",
            overlayFlag: false,
            filterBy: false
        };
    },
    components: {
        NavHeader,
        NavFooter
    },
    mounted () {
        this.getGoodsList();
    },
    methods: {
        getGoodsList () {
            axios.get("http://localhost:8090/goods").then((result) => {
                let res = result.data;
                this.goodsList = res.result;
            });
        },
        setPriceFilter (index) {
            this.priceChecked = index;
            this.closePop();
        },
        showFilterPop () {
            this.overlayFlag = true;
            this.filterBy = true;
        },
        closePop () {
            this.overlayFlag = false;
            this.filterBy = false;
        }
    }
};
</script>
