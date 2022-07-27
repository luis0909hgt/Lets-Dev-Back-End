import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
    async control(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const userData = request.body;

        const updateUserService = new UpdateUserService();

        const updateUser = await updateUserService.execute({ id, userData });

        return response.status(200).json(updateUser);
    }
}

export { UpdateUserController }