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
                <a href="javascript:void(0)" class="price" @click="handleSort">
                    Price 
                    <svg class="icon icon-arrow-short">
                        <use xlink:href="#icon-arrow-short"></use>
                    </svg>
                </a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)" :class="{'cur': priceChecked === 'all'}"  @click="setPriceFilter('all')">All</a></dd>
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
                                    <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{ item.productName }}</div>
                                    <div class="price">{{ item.salePrice }}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m" @click="addCartGood(item.productId)">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!-- 这个是滚动加载的插件 -->
                        <div 
                            class="loadMore"
                            v-infinite-scroll="loadMore" 
                            infinite-scroll-disabled="busy" 
                            infinite-scroll-distance="30"
                        >
                            <img src="./../assets/loading-bubbles.svg" v-show="loading" />
                        </div>
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
            loading: false,
            busy: false,
            overlayFlag: false,
            filterBy: false,
            page: 1,
            pageSize: 8,
            sortFlag: true
        };
    },
    components: {
        NavHeader,
        NavFooter
    },
    mounted () {
        this.getGoodsList(false);
    },
    methods: {
        getGoodsList (flag) {
            // axios.get("http://localhost:8090/goods").then((result) => {
            //     let res = result.data;
            //     this.goodsList = res.result;
            // });
            let param = {
                page: this.page,
                pageSize: this.pageSize,
                sort: this.sortFlag ? 1 : -1,
                priceLevel: this.priceChecked
            };
            this.loading = true;
            axios.get("/goods/list", {
                params: param
            }).then(response =>{
                let res=response.data;
                this.loading = false;
                if(res.status=="0"){
                    if (flag) {
                        this.goodsList= this.goodsList.concat(res.result.list);
                        if (res.result.count == 0) {
                            this.busy = true;
                        } else {
                            this.busy = false;
                        }
                    } else {
                        this.goodsList= res.result.list;
                        this.busy = false;
                    }
                }else{
                    console.log("从服务器请求数据失败！");
                }
            })
        },
        handleSort () {
            this.sortFlag = !this.sortFlag;
        },
        setPriceFilter (index) {
            this.priceChecked = index;
            this.closePop();
            this.page = 1;
            this.getGoodsList(false);
        },
        showFilterPop () {
            this.overlayFlag = true;
            this.filterBy = true;
        },
        closePop () {
            this.overlayFlag = false;
            this.filterBy = false;
        },
        loadMore () {
            this.page++;
            this.busy=false;
            // 这个是防止鼠标下滑 进行无限次的请求事件
            setTimeout(() => {
                this.busy = true;
                this.getGoodsList(true)
            }, 1000)
        },
        addCartGood (productId) {
            let param = {
                productId: productId
            };
            axios.get("/goods/addCart", {
                params: param
            }).then((res, re) => {
                if (res.data.status == 0) {
                    alert("增加成功");
                } else {
                    alert("添加失败");
                }
            })
        }
    }
};
</script>

<style scoped>
    .loadMore {
        width: 100px;
        height: 100px;
        text-align: center;
    }

</style>

