import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepository";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { LoginUserDTO } from "../dtos/LoginUserDTO";

type LoginResponse = {
  token: string;
  user: Omit<User, "password">; // Omit é um tipo do TS que remove uma propriedade
};

type JwtPayload = {
  id: number;
};

export class UserService {
  async signup({ name, email, password }: CreateUserDTO): Promise<User> {
    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new Error("Este email já está cadastrado.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    return newUser;
  }

  async login({ email, password }: LoginUserDTO): Promise<LoginResponse> {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new Error("Email ou senha inválidos.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email ou senha inválidos.");
    }

    const payload = { id: user.id, role: user.role };
    const secret = process.env.JWT_SECRET;
    const expiresIn = 3600;

    if (!secret || !expiresIn) {
      throw new Error(
        "Chave secreta ou tempo de expiração do JWT não configurados."
      );
    }

    const token = jwt.sign(payload, secret, { expiresIn });

    const { password: _, ...userResponse } = user;

    return { token, user: userResponse };
  }

  async profile(token: string): Promise<Omit<User, "password">> {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Chave secreta do JWT não configurada.");
    }

    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;

      const user = await userRepository.findOneBy({ id: decoded.id });

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      const { password: _, ...userResponse } = user;
      return userResponse;
    } catch (error) {
      throw new Error("Token inválido ou expirado.");
    }
  }
}
