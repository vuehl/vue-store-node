// 在服务端server/modules文件夹下新建goods.js文件
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productSchema = new Schema({ // 通过mongoose的Schema定义模板
    "productId"   : String,
    "productName" : String,
    "salePrice"   : Number,
    "productImage": String,
    "checked"     : Number,
    "productNum"  : Number
});
// 导出模板goods, 第三个参数是集合的名字,如果不写的话,就默认在Product后面加上一个s
module.exports = mongoose.model("Product", productSchema, "product");
