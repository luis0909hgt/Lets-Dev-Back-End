import { UserEntity } from "../database/entities/UserEntity";
import { UsersRepository } from "../database/repositories/UsersRepository";
import { AppError } from "../shared/errors";

type TReadProfile = {
    id: string;
}

class ReadProfileService {
    async execute({ id }: TReadProfile): Promise<UserEntity> {
        const usersRepository = new UsersRepository();

        const usersAlreadyExists = await usersRepository.findById({ id });
        if(!usersAlreadyExists) {
            throw new AppError("User not found", 404);
        }

        return usersAlreadyExists;
    }
}


export { ReadProfileService }