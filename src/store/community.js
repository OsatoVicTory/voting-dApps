export const communityReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_COMMUNITY':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const setCommunity = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_COMMUNITY',
            payload: data
        })
    }
};