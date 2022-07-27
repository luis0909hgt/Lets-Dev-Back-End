import { User } from "@prisma/client"
import { prisma } from "../../../prisma/PrismaClient"
import { UserEntity } from "../entities/UserEntity"

type CreateUserDTO = {
    userData: UserEntity
}

type FindByEmailDTO = {
    email: string
}

type FindByIdDTO = {
    id: string
}

type UpdateUserDTO = {
    id: string;
    userData: Partial<UserEntity>;
}

type DeleteUserDTO = {
    id: string;
}

class UsersRepository {
    async create({ userData }: CreateUserDTO) {
        const newUser = await prisma.user.create({
            data: {
                ...userData
            }
        });

        return newUser;
    };

    async findByEmail({ email }: FindByEmailDTO): Promise<UserEntity> {
        const userFound = await prisma.user.findFirst({
            where: {
                email
            }
        });

        return userFound;
    };

    async findById({ id }: FindByIdDTO): Promise<UserEntity> {
        const userFound = await prisma.user.findFirst({
            where: {
                id
            }
        })

        return userFound;
    }

    async update({ id, userData }: UpdateUserDTO): Promise<UserEntity> {
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: userData
        });

        return updatedUser;
    }

    async delete ({ id }: DeleteUserDTO): Promise<void> {
        await prisma.user.delete({
            where: {
                id
            }
        });
    }

    async findAll(): Promise<Partial<UserEntity>[]> {
        const getAllUsers = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                isAdmin: true,
                birthDate: true,
                cellNumber: true,
                created_at: true,
                updated_at: true
            }
        });

        return getAllUsers;
    }
}

export { UsersRepository }