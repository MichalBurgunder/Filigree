
function reducer(state = {}, action) {
    switch (action.type) {
        // case "LOGIN": {
        //     console.log("from the reducer", action.payload)
        //     return action.payload
        // }
        case "LOGIN": {
            return action.payload;
        }

        case "REGISTER": {
            return action.payload;
        }

        case "REGISTER_VALIDATION": {
            return "registration validated";
        }

        case "SET_CURRENT_USER": {
            return action.payload;
        }

        case "VERIFY_TOKEN": {
            return action.payload;
        }

        case "BATCHES_FETCHED": {
            return action.payload;
        }

        default:
            return state
    }
}

export default reducer
