export const ANALYSIS_HISTORY = 'addhistory';
export const REGISTER_VALIDATION = 'register_validation';
export const RESET_PASSWORD = 'reset_password'
export const SET_CURRENT_USER = 'set_current_user'
export const VERIFY_TOKEN = 'verify_token'
export const GET_FEED = 'get_feed'
export const BATCHES_FETCHED = "batches_fetched"
export const ANALYZE_BATCHES = "analyze_batches"
export const CREATE_BATCH = "create_batch"
export const NEW_TEXT = "new_text"
export const NEW_BATCH = "new_batch"
export const ANALYZE_BATCH = "analyze_batch"


let URLBASE;
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
    URLBASE = 'http://localhost:8090/backend';
} else {
    URLBASE = 'http://filigree.propulsion-learn.ch/backend';
}
export {URLBASE}