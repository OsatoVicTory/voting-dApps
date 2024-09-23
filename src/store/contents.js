export const contentsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CONTENTS':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const setContents = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_CONTENTS',
            payload: data
        })
    }
};