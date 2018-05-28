const HistoryReducer = (state = [], action) => {
    switch (action.type) {
        case "HISTORY_FETCHED":
            return action.payload;
        default:
            return state;
    }
}
export default HistoryReducer
