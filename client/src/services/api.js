import axios from "axios";
import { serverURL } from "../App";
import { setUserData } from "../redux/userSlice";

 export const getCurrentUser = async (dispatch) => {
    try {
        const result = await axios.get(serverURL + "/api/user/currentuser", { withCredentials: true });
        dispatch(setUserData(result.data));
        return result.data;
    } catch (error) {
        console.log(error);
    }
}


export const generateNotes = async (payload) => {
    try {
        const result = await axios.post(serverURL + "/api/notes/generate-notes", payload, { withCredentials: true });
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}