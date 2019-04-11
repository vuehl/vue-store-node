<template>
<div>
    <nav-header />
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
                <a href="/">Home</a>
                <span>cart</span>
            </nav>
        </div>

        <!-- 購物車的列表 -->
        <b-container class="clearFloat">
            <b-row class="text-center">
                <b-col>
                    <div v-for="(item, index) in shopCartList" :key="item.product + index">
                        <b-media left-align>
                            
                            <img slot="aside" :src="'static/'+item.productImage" width="80px" height="80px" alt="Media Aside">
                            <ul class="cart">
                                <li>
                                    <b-form-group>
                                        <b-form-checkbox-group>
                                            <b-form-checkbox></b-form-checkbox>
                                        </b-form-checkbox-group>
                                    </b-form-group>
                                </li>
                                <li>{{ item.productName }}</li>
                                <li>
                                    <b-button variant="outline-primary">-</b-button>
                                        {{ item.productNum }}
                                    <b-button variant="outline-primary">+</b-button>
                                </li>
                                <li>{{ item.salePrice }}</li>
                                <li @click="handleCartActicle(item.productId)"><i class="fa fa-trash-o fa-2x" style="cursor: pointer;"></i></li>
                            </ul>
                        </b-media>
                    </div>
                </b-col>
            </b-row>
        </b-container>
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
            shopCartList: []
        }
    },
    components: {
        NavHeader,
        NavFooter
    },
    mounted() {
        this.handleShopCart();
    },
    computed: {
        // countCutBack (productNum) {
        //     return productNum--;
        // },
        // countAdd (productNum) {
        //     return productNum++;
        // }
    },
    methods: {
        handleShopCart () {
            let userGroup = sessionStorage.getItem("userGroup");
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
                }
            });
        },
        handleCartActicle (productId) {
            let comfirm = window.confirm("你確認要刪除嗎?");
            let userGroup = sessionStorage.getItem("userGroup");
            let data = {
                userId: JSON.parse(userGroup).userId,
                productId: productId
            };
            if (comfirm) {
                axios.post("users/cartDel", data, {
                    "Content-Type": "application/x-www-form-urlencoded"
                }).then((response, reject) => {
                    if (response.data.status === "0") {
                        this.handleShopCart();
                        alert("刪除成功");
                    }
                });
            }
        }
    }
};
</script>

<style scoped>
    .cart {
        width: 100%;
        height: 100px;
    }
    .cart li {
        width: 20%;
        height: 100px;
        line-height: 100px;
        float: left;
    }
</style>

