import * as actionTypes from './actions';
import axios from '../../axios-instance';
export const authAction = (id) => {

    return {
        type: actionTypes.IS_AUTHENTICATED,
        id: id,
    }
}
export const authActionError = () => {
    return {
        type: actionTypes.LOGINERROR
    }
}
export const authActionStart = () => {
    return {
        type: actionTypes.AUTHSTART
    }
}
export const authActionGet = (ref, password) => {
    return (dispatch) => {
        dispatch(authActionStart());
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/drivers/id?ref=${ref}`)
            .then((response) => {
                const id = response.data.body.id
                axios.get(`https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/drivers/index/${id}`)
                    .then((response) => {

                        if (password === response.data.body.driver.password) {
                            return dispatch(authAction(id));
                        }
                        else {
                            return dispatch(authActionError())
                        }
                    }).catch(function (error) {

                        return dispatch(authActionError());
                    });
            })
            .catch((err) => { return dispatch(authActionError()) })

    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const driverInfo = (driver) => {
    return {
        type: actionTypes.DRIVERINFO,
        driver: driver,

    }
}
export const driverBalance = (earning) => {
    return {
        type: actionTypes.DRIVERBALANCE,
        earning: earning
    }
}

export const statusDriver = (activeDeactive) => {
    return {
        type: actionTypes.DEACTIVATEDRIVER,
        activationStatus: activeDeactive
    }
}

export const driverDataGet = (id) => {
    return (dispatch) => {
        console.log(id);
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/drivers/index/${id}`)
            .then((response) => {
                return dispatch(driverInfo(response.data.body.driver));
            }).catch(function (error) {
            });


    }
}

export const driverBalanceGet = (id, driStatus) => {
    return (dispatch) => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/drivers/balance?id=${id}`)
            .then((response) => {
                console.log(response.data);

                if (new Date().getDay() === 2 && new Date().getHours() === 18 && response.data.body.balance < 0) {
                    axios.get(`https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/drivers/deactivate?id=${id}`)
                        .then((response) => {
                            dispatch(statusDriver(false))
                        })
                        .catch((err) => {
                        })
                }
                else if (response.data.body.balance >= 0) {
                    axios.get(`https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/drivers/activate?id=${id}`)
                        .then((response) => {
                            dispatch(statusDriver(response.data.body.success))
                        })
                        .catch((err) => {
                        })
                }
                console.log(response.data)
                return dispatch(driverBalance(response.data.body.balance));
            }).catch(function (error) {
            });
    }
}



export const transaction = (trans) => {
    return {
        type: actionTypes.TRANSACTION,
        transaction: trans
    }
}

export const transactionError = (error) => {
    return {
        type: actionTypes.TRANSACTIONERROR,
        error: error
    }
}






export const vehicleInfo = (vehicleInfo) => {
    return {
        type: actionTypes.VEHICLEINFO,
        vehicle: vehicleInfo
    }
}

export const vehicleDataGet = (id) => {
    return (dispatch) => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/drivers/index/${id}`)
            .then((response) => {
                dispatch(vehicleInfo(response.data.body.driver.vehicle))
            })
            .catch((err) => {
            })
    }
}

export const ratingInfo = (ratingInfo, meanRating, noOfTimesRated, countOfEachRating) => {
    return {
        type: actionTypes.DRIVERRATINGS,
        ratingArray: ratingInfo,
        avgRatingOfDriver: meanRating,
        noOfTimesDriverRated: noOfTimesRated,
        countObj: countOfEachRating

    }
}

export const ratingDataGet = (id) => {
    return (dispatch) => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.icabbi.com/v2/drivers/ratings/${id}`)
            .then((response) => {
                const ratingsArray = []
                const counts = {}
                for (let key of response.data.body.driverratings) {
                    ratingsArray.push(Number(key.rating));
                }

                for (var i = 0; i < ratingsArray.length; i++) {
                    var num = ratingsArray[i];
                    counts[num] = counts[num] ? counts[num] + 1 : 1;
                }

                const noOfRatings = ratingsArray.length;
                const avgRating = ratingsArray.reduce((preVal, currVal, index, array) => {
                    preVal += currVal
                    if (index === array.length - 1) {
                        return preVal / array.length
                    }
                    else {
                        return preVal;
                    }
                })
                const updatedAvgRatings = parseFloat(avgRating.toFixed(2));
                dispatch(ratingInfo(response.data.body.driverratings, updatedAvgRatings, noOfRatings, counts))
            })
            .catch((err) => {
            })
    }
}