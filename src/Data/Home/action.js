import * as HttpApi from "../../Lib";
import * as ActionTypes from './actionTypes';

//////////////////
///// POST ////////
//////////////////

export const getCandidateList = (params) => {
    return (dispatch) => {
        return HttpApi.get('GET_CANDIDATE_LIST', params)
            .then((response) => {
                dispatch({type: ActionTypes.CANDIDATE, candidate: response.data});
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};
export const getApplicationList = (params) => {
    return (dispatch) => {
        return HttpApi.get('GET_APPLICATION_LIST', params)
            .then((response) => {
                dispatch({type: ActionTypes.CANDIDATE, application: response.data});
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};
export const getApplication = (params) => {
    return (dispatch) => {
        return HttpApi.get('GET_APPLICATION_ONE', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};
export const postApplication = (params) => {
    return (dispatch) => {
        return HttpApi.get('POST_APPLICATION', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};
export const getQuestionList = () => {
    return (dispatch) => {
        return HttpApi.get('GET_QUESTION_LIST', params)
            .then((response) => {
                dispatch({type: ActionTypes.CANDIDATE, question: response.data});
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};
export const getQuestion = (params) => {
    return (dispatch) => {
        return HttpApi.get('GET_QUESTION_ONE', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};

export const getComment = (params) => {
    return (dispatch) => {
        return HttpApi.get('GET_COMMENT', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};
export const postComment = (params) => {
    return (dispatch) => {
        return HttpApi.get('POST_COMMENT', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};
export const updateComment = (params) => {
    return (dispatch) => {
        return HttpApi.get('UPDATE_COMMENT', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};