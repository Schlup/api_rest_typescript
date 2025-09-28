import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }

    const userService = new UserService();

    try {
      const newUser = await userService.signup({ name, email, password });

      const { password: _, ...userResponse } = newUser;

      return res.status(201).json(userResponse);
    } catch (error) {
      if (error instanceof Error && error.message.includes("cadastrado")) {
        return res.status(409).json({ message: error.message });
      }

      console.log(error);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios." });
    }

    const userService = new UserService();

    try {
      const { token, user } = await userService.login({ email, password });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false, // Aqui é pra deixar true quando estiver em produção.
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
        domain: "localhost",
      });

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("inválidos")) {
          return res.status(401).json({ message: error.message });
        }
        if (error.message.includes("configurados")) {
          console.error("Erro de configuração do JWT:", error.message);
          return res.status(500).json({ message: "Erro interno no servidor." });
        }
      }

      console.log(error);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async profile(req: Request, res: Response) {
    const token = req.cookies["auth_token"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Acesso negado. Token não fornecido." });
    }

    const userService = new UserService();

    try {
      const userProfile = await userService.profile(token);

      return res.status(200).json(userProfile);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("inválido ou expirado")) {
          return res.status(401).json({ message: error.message });
        }
        if (error.message.includes("não encontrado")) {
          return res.status(404).json({ message: error.message });
        }
      }

      console.log(error);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("auth_token");
    res.json({ message: "Logged out successfully" });
  }
}
