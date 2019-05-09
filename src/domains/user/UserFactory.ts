import { hydrate, validateEntity } from "../../helper";
import { User } from "../../orm/entity/User";
import PasswordHasher from "../../../lib/security/PasswordHasher";
import { randomStr } from "../../util/random";

class InvalidUserException extends Error {
  constructor(error) {
    super(error.message);
  }
}

class UserFactory {
  public async createUser(data: any): Promise<User> {
    const user = hydrate(User, data) as User;
    user.password = data.password;
    const validation = validateEntity(user, data);
    if (validation.success === false) {
      throw new InvalidUserException(validation);
    }

    user.role = "user";
    user.password = await PasswordHasher.hash(user.password);
    user.createdAt = new Date();
    user.lastLoginAt = new Date();
    user.code = randomStr();

    return user;
  }
}

export default new UserFactory();
