const BatchReducer = (state = [], action) => {
    switch (action.type) {
        case "BATCHES_FETCHED":
            return action.payload;
        case "CREATE_BATCH":
            return "Batch created!";
        case "ANALYZE_BATCH":
            return "Batch analyzed!"
        case "NEW_BATCH":
            return action.payload
        case "DELETE_TEXT":
            return "Batch deleted"
        default:
            return state;
    }
}
export default BatchReducer
