// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint"
    },
    env: {
        browser: true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        "plugin:vue/essential",
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        "standard"
    ],
    // required to lint *.vue files
    plugins: ["vue"],
    // add your custom rules here
    rules: {
        // allow async-await
        "generator-star-spacing": "off",
        // 控制間隔是4位
        indent: ["warn", 4],
        // 設置强制加分號
        semi: ["warn", "always"],
        // 設置 符號的類型 single double
        quotes: ["warn", "double"],
        // 設置前後的空格
        "key-spacing": ["warn", {
            "multiLine": {
                "beforeColon": false,
                "afterColon": true
        
            },
            "align": {
                "beforeColon": true,
                "afterColon": true,
                "on": "colon"
            }
        }],
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    }
};
