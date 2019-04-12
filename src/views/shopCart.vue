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
                                    <input type="checkbox" :checked="item.checked === 1" @click="editCart('checked', item)"/>
                                </li>
                                <li>{{ item.productName }}</li>
                                <li>
                                    <b-button variant="outline-primary" @click="editCart('minu', item)">-</b-button>
                                        {{ item.productNum }}
                                    <b-button variant="outline-primary" @click="editCart('add', item)">+</b-button>
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
        },
        editCart (flag, item) {
            if (flag === "minu") {
                if (item.productNum <= 1) {
                    return;
                }
                item.productNum--;
            } else if (flag === "add"){
                item.productNum++;
            } else {
                item.checked= item.checked == 1 ? 0 : 1;
            }
            let userGroup = sessionStorage.getItem("userGroup");
            let data = {
                "userId": JSON.parse(userGroup).userId,
                "productId": item.productId,
                "productNum": item.productNum,
                "checked": item.checked
            };

            axios.post("/users/editCart", data, {
                "Content-Type": "application/x-www-form-urlencoded"
            }).then((response, reject) => {
                
            });
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

