import * as ActionTypes from './actionTypes';

export const initialState = {
    candidate: {
    },
    question: {
    },
    application: {
    },
}
/*
*/
export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CANDIDATE:
            return Object.assign({}, state, { candidate: action.candidate.candidates });
        case ActionTypes.QUESTION:
            return Object.assign({}, state, { question: action.question.questions });
        case ActionTypes.APPLICATION:
            return Object.assign({}, state, { application: action.application.applications });
        default:
            return state;
    }
}
