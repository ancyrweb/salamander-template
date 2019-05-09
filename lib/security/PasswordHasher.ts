import * as upash from "upash";
import * as argon2 from "@phc/argon2";

upash.install("argon2", argon2);

class PasswordManager {
  static hash(val: string) {
    return upash.hash(val);
  }

  static match(hashed: string, raw: string) {
    return upash.verify(hashed, raw);
  }
}

export default PasswordManager;
