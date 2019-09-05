import actionType from "./actionsType";

const initialState = {};
const  userInfo = (state = initialState,action:any) =>{
    switch (action.type) {
        case `${actionType.GET_USER_INFO}`:
            return {
                ...state
            };
        case  `${actionType.GET_USER_INFO}_SUCCESS`:
            return {
                ...state,
                ...action.payload.data.data
            };
        case `${actionType.GET_USER_INFO}_FAIL`:
            return {
                ...state
            };
        case `${actionType.UPDATE_USER_INFO}`:
            return {
                ...state,
                ...action.data
            };
        case `${actionType.UPDATE_MENU_LIST}`:
            return {
                ...state,
                ...action.data
            };
        case `${actionType.UPDATE_AUTH_DATA}`:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};

export default userInfo;