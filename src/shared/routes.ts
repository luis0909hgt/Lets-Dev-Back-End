import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { ReadAllUsersController } from "../controllers/ReadAllUsersController";
import { ReadProfileController } from "../controllers/ReadProfileController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { UserLoginController } from "../controllers/UserLoginController";
import { UserLogoutController } from "../controllers/UserLogoutController";
import { authSecurity } from "./middlewares/authSecurity";

const router = Router();

const createUserController = new CreateUserController();
const userLoginController = new UserLoginController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const readProfileController = new ReadProfileController();
const userLogoutController = new UserLogoutController();
const readAllUsersController = new ReadAllUsersController();

router.post("/users/create", createUserController.control);
router.post("/sessions/login", userLoginController.control);
router.put("/users/update", authSecurity,updateUserController.control);
router.get("/users/read", authSecurity, readProfileController.control);
router.get("/users/all", authSecurity, readAllUsersController.control);
router.delete("/users/delete", authSecurity, deleteUserController.control);
router.delete("/sessions/logout", authSecurity, userLogoutController.control);


export { router }