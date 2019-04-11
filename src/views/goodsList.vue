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
                <a href="javascript:void(0)" class="price" @click="handlePriceSort">
                    Price 
                </a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
                    <dl class="filter-price">
                        <dt>Price</dt>
                        <dd><a href="javascript:void(0)" :class="{'cur': priceChecked === 'all'}"  @click="setPriceFilter('all')">All</a></dd>
                        <dd v-for="(item, index) in priceFilter" :key="index">
                            <a href="javascript:void(0)"  @click="setPriceFilter(index)" :class="{'cur': priceChecked===index}">{{ item.startPrice }} - {{ item.endPrice }}</a>
                        </dd>
                    </dl>
                </div>
                <b-container class="clearFloat">
                    <b-row class="text-center">
                        <b-col cols="12" sm="6" md="4" lg="4" xl="3" v-for="(item, index) in goodsList" :key="item.productId + index">
                            <div>
                                <b-card
                                    :title="item.productName"
                                    :img-src="'static/'+item.productImage"
                                    img-alt="Image"
                                    img-top
                                    tag="article"
                                    style="max-width: 20rem;"
                                >
                                    <b-card-text>
                                        {{ item.salePrice }}
                                    </b-card-text>
                                    <b-button href="javascript:void(0);" variant="primary" @click="addCartGood(item.productId)">加入購物車</b-button>
                                </b-card>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
                
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
        handlePriceSort () {
            this.sortFlag = !this.sortFlag;
              let param = {
                page: 1,
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
                    this.goodsList= res.result.list;
                }else{
                    console.log("从服务器请求数据失败！");
                }
            })
        },
        getGoodsList (flag) {
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
            if (this.goodsList.length >= 8) {
                // 这个是防止鼠标下滑 进行无限次的请求事件
                setTimeout(() => {
                    this.busy = true;
                    this.getGoodsList(true)
                }, 1000)
            }
        },
        addCartGood (productId) {
            let userGroup = sessionStorage.getItem("userGroup");
            if (userGroup) {
                let data = {
                "productId": productId,
                "userId": JSON.parse(userGroup).userId
                };
                axios.post("/goods/addCart", data, 
                {
                    "Content-Type": "application/x-www-form-urlencoded"
                }).then((res, re) => {
                    if (res.data.status == 0) {
                        sessionStorage.setItem("productNum", res.data.result);
                        alert("增加成功");
                    } else {
                        alert("添加失败");
                    }
                })
            } else {
                alert("請先登錄");
            }
        }
    }
};
</script>

<style scoped>
    .clearFloat::after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }
    .loadMore {
        width: 100px;
        height: 100px;
        text-align: center;
    }

</style>

