
export const createReducer = (slicename) => (state, action) => {
    const { type, payload, endpoint } = action;
    switch (type) {
        case `${slicename}/LOADING`:
            return { ...state, [endpoint]: { loading: true, error: null, data: null } };
        case `${slicename}/SUCCESS`:
            return { ...state, [endpoint]: { loading: false, error: null, data: payload } };
        case `${slicename}/ERROR`:
            return { ...state, [endpoint]: { loading: false, error: payload, data: null } };
        default:
            return state;
    }
};