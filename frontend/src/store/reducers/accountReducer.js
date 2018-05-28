

const AccountReducer = (state = [], action) => {
    switch (action.type) {
        case "ACCOUNT_FETCHED":
            return action.payload;
        default:
            return state;
    }
}
export default AccountReducer
