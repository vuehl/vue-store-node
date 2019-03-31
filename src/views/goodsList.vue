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
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)">All</a></dd>
                        <dd>
                            <a href="javascript:void(0)">0 - 100</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)">100 - 500</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)">500 - 1000</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)">1000 - 2000</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="item in goodsList" :key="item.productId">
                                <div class="pic">
                                    <a href="#"><img :src="'static/'+item.prodcutImg" alt=""></a>
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
    <nav-footer />
</div>
</template>

<script>
import NavHeader from '@/components/header'
import NavFooter from '@/components/footer'
import axios from 'axios'
import '@/assets/css/base.css'
import '@/assets/css/checkout.css'
import '@/assets/css/login.css'
import '@/assets/css/product.css'
export default {
    data () {
        return {
            goodsList: [
            {
            "productId":"10001",
            "productName":"小米6",
            "prodcutPrice":"2499",
            "prodcutImg":"mi6.jpg"
        },
        {
            "productId":"10002",
            "productName":"小米笔记本",
            "prodcutPrice":"3999",
            "prodcutImg":"note.jpg"
        },
        {
            "productId":"10003",
            "productName":"小米6",
            "prodcutPrice":"2499",
            "prodcutImg":"mi6.jpg"
        },
        {
            "productId":"10004",
            "productName":"小米6",
            "prodcutPrice":"2499",
            "prodcutImg":"1.jpg"
        },
        {
            "productId":"10005",
            "productName":"小米6",
            "prodcutPrice":"2499",
            "prodcutImg":"2.jpg"
        },
        {
            "productId":"10006",
            "productName":"小米6",
            "prodcutPrice":"2499",
            "prodcutImg":"3.jpg"
        },
        {
            "productId":"10007",
            "productName":"小米6",
            "prodcutPrice":"2499",
            "prodcutImg":"4.jpg"
        },
        {
            "productId":"10008",
            "productName":"小米6",
            "prodcutPrice":"2499",
            "prodcutImg":"5.jpg"
        }]
        }
    },
    components: {
        NavHeader,
        NavFooter
    },
    mounted () {
        // this.getGoodsList()
    },
    methods: {
        getGoodsList () {
            // axios.get('../../mock/goods').then((result) => {
            //     let res = result.data
            //     this.goodsList = res.result
            // })
        }
    }
}
</script>
