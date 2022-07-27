import { UserEntity } from "../database/entities/UserEntity";
import { UsersRepository } from "../database/repositories/UsersRepository";
import { AppError } from "../shared/errors";

type TREadAllUsers = {
    userId: string;
}

class ReadAllUsersService {
    async execute({ userId }: TREadAllUsers): Promise<Partial<UserEntity>[]> {
        const usersRepository = new UsersRepository();

        const { isAdmin } = await usersRepository.findById({ id: userId });

        if (!isAdmin) {
            throw new AppError("User must be admin", 403);
        };

        const getAllUsers = await usersRepository.findAll();
        if (getAllUsers.length < 1) {
            throw new AppError("No user found", 404);
        }


        return getAllUsers;

    }
}

export { ReadAllUsersService }