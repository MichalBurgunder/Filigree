const TextReducer = (state = [], action) => {
    switch (action.type) {
        case "TEXTS_FETCHED":
            return action.payload;
        case "NEW_TEXT":
            return action.payload;
        default:
            return state;
    }
}
export default TextReducer
