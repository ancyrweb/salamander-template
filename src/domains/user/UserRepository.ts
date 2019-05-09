import { repository } from "../../helper";
import { User } from "../../orm/entity/User";
import BaseRepository from "../BaseRepository";
import { Repository } from "typeorm";

class UserRepository extends BaseRepository<User> {
  getRepository(): Repository<User> {
    return repository(User) as Repository<User>;
  }
}

export default new UserRepository();
