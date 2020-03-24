import * as actionTypes from '../actions/actions';

const initialState = {
    driverId: null,
    driver: {},
    earnings: 0,
    isAuthenticated: false,
    error: false,
    loading: false,
    transactionError: null,
    vehicleData: null,
    driverStatus: true,
    ratingArr: [],
    avgRating: null,
    noOfTimesRated: null,
    counts: {}


}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
                driverId: action.id,
                loading: false
            };
        case actionTypes.AUTHSTART:

            return {
                ...state,
                loading: true
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                driver: {},
                earnings: 0,
                error: false,
                driverId: null,
                vehicleData: null,
                transactionError: null,
                driverStatus: true,
                ratingArr: [],
                avgRating: null,
                noOfTimesRated: null,
                counts: {}

            };

        case actionTypes.DRIVERINFO:
            return {
                ...state,
                driver: action.driver,
                vehicleData: action.driver.vehicle
            };

        case actionTypes.DRIVERBALANCE:
            return {
                ...state,
                earnings: action.earning
            };
        case actionTypes.LOGINERROR:
            return {
                ...state,
                error: true,
                loading: false
            };
        case actionTypes.TRANSACTIONERROR:
            return {
                ...state,
                transactionError: action.error
            };

        case actionTypes.DEACTIVATEDRIVER:
            return {
                ...state,
                driverStatus: action.activationStatus
            };

        case actionTypes.DRIVERRATINGS:
            return {
                ...state,
                ratingArr: action.ratingArray,
                avgRating: action.avgRatingOfDriver,
                noOfTimesRated: action.noOfTimesDriverRated,
                counts: action.countObj
            }


        default:
            return state
    }
}

export default reducer;