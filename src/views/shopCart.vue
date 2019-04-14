<template>
<div>
    <nav-header />
    <div class="nav-breadcrumb-wrap">
        <div class="container">
        <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <span>My Cart</span>
        </nav>
        </div>
    </div>
   
    <div class="container">
        <div class="cart">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>My Cart</span></h2>
            </div>
            <div class="item-list-wrap">
                <div class="cart-item">
                <div class="cart-item-head">
                    <ul>
                        <li>Items</li>
                        <li>Price</li>
                        <li>Quantity</li>
                        <li>Subtotal</li>
                        <li>Edit</li>
                    </ul>
                </div>
                <ul class="cart-item-list">
                    <li v-for="(item, index) in shopCartList" :key="item.productId + index">
                        <div class="cart-tab-1">
                            <div class="cart-item-check">
                                <input type="checkbox" :checked="item.checked == 1" @click="editCart('checked', item)" />
                            </div>
                            <div class="cart-item-pic">
                            <img :src="'/static/' +item.productImage">
                            </div>
                            <div class="cart-item-title">
                            <div class="item-name">{{ item.productName }}</div>
                            </div>
                        </div>
                        <div class="cart-tab-2">
                            <div class="item-price">{{ item.salePrice }}</div>
                        </div>
                        <div class="cart-tab-3">
                            <div class="item-quantity">
                            <div class="select-self select-self-open">
                                <div class="select-self-area">
                                <a class="input-sub" @click="editCart('minu', item)">-</a>
                                <span class="select-ipt">{{ item.productNum }}</span>
                                <a class="input-add" @click="editCart('add', item)">+</a>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="cart-tab-4">
                            <div class="item-price-total">{{ item.productNum * item.salePrice }}</div>
                        </div>
                        <div class="cart-tab-5">
                            <div class="cart-item-opration">
                                <a href="javascript:;" class="item-edit-btn" @click="handleCartActicle(item.productId)">
                                    删除
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
            <div class="cart-foot-wrap">
                <div class="cart-foot-inner">
                    <div class="cart-foot-l">
                        <div class="item-all-check">
                            <input type="checkbox" id="checkedAll" />
                            <label for="checkedAll"> Select all</label>
                        </div>
                    </div>
                    <div class="cart-foot-r">
                        <div class="item-total">
                            Item total: <span class="total-price">{{ itemTotal }}</span>
                        </div>
                        <div class="btn-wrap">
                            <a class="btn btn--red" :class="{'disabled': itemTotal == 0}" @click="handleCheckOut">Checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav-footer />
</div>
</template>
<style>
.input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
}
.item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
}
.item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
}

</style>

<script>
import NavHeader from "@/components/header";
import NavFooter from "@/components/footer";
import "@/assets/css/font-awesome.min.css";
import axios from "axios";

export default {
    data () {
        return {
            shopCartList: [],
            itemTotal   : 10
        }
    },
    components: {
        NavHeader,
        NavFooter
    },
    mounted() {
        this.init();
    },
    methods: {
        init () {
            let userGroup = sessionStorage.getItem("userGroup");
            let data = {
                "userId": JSON.parse(userGroup).userId
            };
            axios.post("/users/shopCartList", 
                data
                ,{
                    "Content-Type": "application/x-www-form-urlencoded"
                }
                ).then((response, reject) => {
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
                        this.init();
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
        },
        handleCheckOut () {
            if (this.itemTotal == 0) {
                return;
            }
            this.$router.push({
                path: "/address"
            });
        }
    }
};
</script>
