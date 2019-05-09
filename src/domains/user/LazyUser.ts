import { Maybe } from "../../typings/types";
import { User } from "../../orm/entity/User";
import UserRepository from "./UserRepository";

class LazyUser {
  private id: string;
  private role: string;
  private user: Maybe<User> = null;

  constructor(id, role) {
    this.id = id;
    this.role = role;
  }

  async getUser(): Promise<User> {
    if (this.user === null) {
      this.user = await UserRepository.get(this.id);
    }

    return this.user;
  }
}

export default LazyUser;
