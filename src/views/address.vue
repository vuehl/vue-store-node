<template>
    <div>
        <nav-header />
        <div class="nav-breadcrumb-wrap">
            <div class="container">
                <nav class="nav-breadcrumb">
                    <a href="/">Home</a>
                    <span>Address</span>
                </nav>
            </div>
        </div>
        <div class="checkout-page">
        <div class="container">
            <div class="checkout-addr">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- process step -->
            <div class="check-step">
                <ul>
                <li class="cur"><span>Confirm</span> address</li>
                <li><span>View your</span> order</li>
                <li><span>Make</span> payment</li>
                <li><span>Order</span> confirmation</li>
                </ul>
            </div>

            <!-- address list -->
            <div class="page-title-normal checkout-title">
                <h2>
                    <span>
                        Shipping address
                    </span>
                </h2>
            </div>
            <div class="addr-list-wrap">
                <div class="addr-list">
                    <ul>
                        <li v-for="(item, index) in addressList" :key="item.addressId + index" :class="{'selectIndex': selectIndex==index}" @click="handleSelectIndex(index, item.addressId)">
                            <dl>
                                <dt>{{ item.userName }}</dt>
                                <dd class="address">{{ item.streeName }}</dd>
                                <dd class="tel">{{ item.tel }}</dd>
                            </dl>
                            <div class="addr-opration addr-del">
                                <a href="javascript:;" class="addr-del-btn" @click="handleDeleteAddress(item.addressId)">
                                    删除
                                </a>
                            </div>
                            <div class="addr-opration addr-default" v-show="!item.isDefault">
                                <a href="javascript:;" class="addr-set-default-btn" @click="handleSetDefaultAddress(item.addressId)">
                                    Set default
                                </a>
                            </div>
                            <div class="addr-opration addr-default" v-show="item.isDefault">
                                Default address
                            </div>
                        </li>
                        <li class="addr-new">
                            <div class="add-new-inner">
                                
                                <p>Add new address</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="shipping-addr-more">
                <a class="addr-more-btn up-down-btn" href="javascript:;">
                    more
                    <i class="i-up-down">
                        <i class="i-up-down-l"></i>
                        <i class="i-up-down-r"></i>
                    </i>
                </a>
                </div>
            </div>

                <!-- shipping method-->
                <div class="page-title-normal checkout-title">
                    <h2><span>Shipping method</span></h2>
                </div>
                <div class="shipping-method-wrap">
                    <div class="shipping-method">
                    <ul>
                        <li class="check">
                        <div class="name">Standard shipping</div>
                        <div class="price">Free</div>
                        <div class="shipping-tips">
                            <p>Once shipped,Order should arrive in the destination in 1-7 business days</p>
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
                <div class="next-btn-wrap">
                    <a class="btn btn--m btn--red" href="javascript:void(0);">
                        <router-link :to="{'path': '/orderConfirm', 'query': {'addressId': this.addressId}}">
                            Next
                        </router-link>
                    </a>
                </div>
            </div>
        </div>
        </div>
        <nav-footer />
    </div>
</template>
<style scoped>
    .selectIndex {
        border-color: #ee7a23;
    }
</style>

<script>
import NavHeader from "@/components/header";
import NavFooter from "@/components/footer";
import "@/assets/css/font-awesome.min.css";
import axios from "axios";
let userGroup = sessionStorage.getItem("userGroup");
export default {
    data () {
        return {
            addressList: [],
            selectIndex: 0,
            addressId  : ""
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
            let param = {
                "userId": JSON.parse(userGroup).userId
            };
            axios.get("/users/addressList", {
                params: param
            }).then((response) => {
                let res = response.data;
                if (res.status == "0") {
                    this.addressList = res.result;
                    let _addressId = "";
                    res.result.forEach(function (item) {
                        if (item.isDefault == true) {
                            _addressId = item.addressId;
                        }
                    });
                    this.addressId = _addressId;
                }
            });
        },
        handleSelectIndex (index, addressId) {
            this.selectIndex = index;
            this.addressId = addressId;
        },
        handleSetDefaultAddress (addressId) {
            let data = {
                "userId"   : JSON.parse(userGroup).userId,
                "addressId": addressId
            };
            axios.post("/users/setDefaultAddress", 
                data
                ,{
                    "Content-Type": "application/x-www-form-urlencoded"
                }).then((response) => {
                let res = response.data;
                if (res.status == "0") {
                    this.init();
                }
            });
        },
        handleDeleteAddress (addressId) {
            let confirm = window.confirm("你确认要删除该地址嘛?");
            if (confirm) {
                let data = {
                    "userId": JSON.parse(userGroup).userId,
                    "addressId": addressId
                };
                axios.post("/users/deleteAddress", 
                    data
                    ,{
                    "Content-Type": "application/x-www-form-urlencoded"
                    }).then((response) => {
                        let res = response.data;
                        if (res.status == "0") {
                            this.init();
                        }
                });
            }
        }
    }
}
</script>
