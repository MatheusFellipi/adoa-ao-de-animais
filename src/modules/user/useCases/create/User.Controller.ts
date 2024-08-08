import { container } from "tsyringe";
import { CreateUserUseCase } from "./User.UseCase";
import { UserModal } from "@modules/user/model/user";

 export class CreateUserController {
  static async handleInternal(form: UserModal): Promise<UserModal> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const data = await createUserUseCase.execute(form);
    return data
  }
}

