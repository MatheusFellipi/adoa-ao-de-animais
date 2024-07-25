import { container } from "tsyringe";
import { DeleteUserUseCase } from "./User.UseCase";

export class DeleteUserController {
  static async internalHandle(userId: string): Promise<void> {
    const useCase = container.resolve(DeleteUserUseCase);
     await useCase.execute(userId);
  }
}
