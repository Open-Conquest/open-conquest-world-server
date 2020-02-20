import {UserEndpoints} from "./userEndpoints";
import {registerUserController} from "../services/registerUser";
import {loginUserController} from "../services/loginUser";

const userEndpoints = new UserEndpoints(
    registerUserController,
    loginUserController,
);

export {userEndpoints};
