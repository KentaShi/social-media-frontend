import { useReducer } from "react";
import { createContext } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        _id: "63394b459aa21135351faef5",
        username: "hoangnam11",
        email: "hoangnam11@gmail.com",
        profilePicture: "person/person4.jpg",
        coverPicture: "post/post1.jpg",
        followers: [],
        followings: ["6339d3ac7b9746f28b57a934"],
        isAdmin: false,
    },
    isFetching: false,
    error: false,

};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}