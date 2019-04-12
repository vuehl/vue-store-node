<template>
   <div class="header-root">
        <!-- 這個是模態狂 -->
        <b-modal id="modal-scrollable" scrollable title="Login" v-model="showModel">
            <div>
                <b-form-group
                    id="fieldset-1"
                    label="Username"
                    label-for="Username"
                    :invalid-feedback="UsernameInvalidFeedback"
                    :valid-feedback="UsernameValidFeedback"
                    :state="UsernameState"
                >
                    <b-form-input id="Username" v-model="Username" :state="UsernameState" trim></b-form-input>
                </b-form-group>
                <b-form-group
                    id="fieldset-2"
                    label="Password"
                    label-for="Password"
                    :invalid-feedback="PasswordInvalidFeedback"
                    :valid-feedback="PasswordValidFeedback"
                    :state="PasswordState"
                >
                    <b-form-input id="Password" v-model="Password" :state="PasswordState" trim></b-form-input>
                </b-form-group>
            </div>
             <div slot="modal-footer" class="w-100">
                <b-button
                    variant="primary"
                    size="sm"
                    class="float-right"
                    @click="handleLogin"
                    :disabled="isDisable"
                >
                    Submit
                </b-button>
            </div>
        </b-modal>
        <b-container>
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-brand href="/">HL Store</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item href="javascript:void(0);" v-if="loginUserName" @click="shopCart">
                                購物車 <b-badge variant="light">{{ shopCartNumber }}</b-badge>
                        </b-nav-item>
                        <b-nav-item href="javascript:void(0);" v-if="loginUserName">你好啊, {{ loginUserName }}</b-nav-item>
                        <b-nav-item-dropdown right>
                            <template slot="button-content"><em>用戶</em></template>
                            <b-dropdown-item href="javascript:void(0);">個人中心</b-dropdown-item>
                            <b-dropdown-item href="javascript:void(0);" v-b-modal.modal-scrollable v-if="!loginUserName">登陸</b-dropdown-item>
                            <b-dropdown-item href="javascript:void(0);" v-if="loginUserName" @click="handleLogout">退出</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </b-container>
   </div>
</template>

<style scoped>
    .header-root {
        width: 100%;
        background: #17a2b8 !important;
        height: auto;
    }
</style>

<script scoped>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

export default {
    data () {
        return {
            Username: "",
            Password: "",
            showModel: false,
            loginUserName: "",
            shopCartNumber: 0
        };
    },
    computed: {
        isDisable () {
            return this.UsernameState && this.PasswordState ? false : true;
        },
        UsernameState () {
            return this.Username.length >= 4 ? true : false
        },
        UsernameInvalidFeedback() {
            if (this.Username.length > 4) {
                return ''
            } else if (this.Username.length > 0) {
                return 'Enter at least 4 characters'
            } else {
                return 'Please enter something'
            }
        },
        UsernameValidFeedback() {
            return this.UsernameState === true ? 'Thank you' : ''
        },
        PasswordState () {
            return this.Password.length >= 4 ? true : false
        },
        PasswordInvalidFeedback() {
            if (this.Password.length > 4) {
                return ''
            } else if (this.Password.length > 0) {
                return 'Enter at least 4 characters'
            } else {
                return 'Please enter something'
            }
        },
        PasswordValidFeedback() {
            return this.PasswordState === true ? 'Thank you' : ''
        }
    },
    methods: {
        init () {
            let userGroup = sessionStorage.getItem("userGroup");
            if (userGroup) {
                let productNum = sessionStorage.getItem("productNum");
                let userName = JSON.parse(userGroup).userName;
                this.loginUserName = userName;
                this.shopCartNumber = productNum;
            }
        },
        shopCart () {
            this.$router.push({
                path: "/shopCart"
            });
        },
        handleLogin () {
            let data = {
                "userName": this.Username,
                "userPwd" : this.Password
            };
            axios.post("/users/login", data, {
                "Content-Type": "application/x-www-form-urlencoded"
            }).then((response, reject) => {
                let res = response.data;
                if (res.status === "0") {
                    let userGroup = {
                        userName: res.result.userName,
                        userId  : res.result.userId
                    };
                    sessionStorage.setItem("userGroup", JSON.stringify(userGroup));
                    sessionStorage.setItem("productNum", res.result.productNum.length);
                    // 關閉模態框
                    this.showModel = false;
                    this.Username= "";
                    this.Password="";
                    this.loginUserName = res.result.userName;
                    this.shopCartNumber = res.result.productNum.length;
                } else {
                    this.Username= "";
                    this.Password="";
                }
            });
        },
        handleLogout () {
            axios.post("/users/logout").then((response, reject) => {
                sessionStorage.removeItem("userGroup");
                let res = response.data;
                if (res.status === "0") {
                    this.loginUserName = "";
                }
            });
        }
    },
    mounted () {
       this.init();
    }
}
</script>

