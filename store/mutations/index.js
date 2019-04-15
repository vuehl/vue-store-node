export default {
    updateCartNum (state, {type, num, price, selected}) {
        if (type === "init") {
            state.shopCart = num;
            state.selectedCartPrice = price;
        } else if (type === "add") {
            state.shopCart += num;
            if (selected) {
                state.selectedCartPrice += price;
            }
        } else if (type === "minu") {
            state.shopCart -= num;
            if (selected) {
                state.selectedCartPrice -= price;
            }
        } else if (type === "selectOne") {
            if (selected) {
                state.selectedCartPrice += price;
            } else {
                state.selectedCartPrice -= price;
            }
        } else {
            state.selectedCartPrice = price;
        }
    },
    isCheckedAll (state, isCheckedAll) {
        state.isCheckedAll = isCheckedAll;
    }
};
