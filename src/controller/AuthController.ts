import ControllerInterface from "salamander/dist/interface/ControllerInterface";
import Mutation from "salamander/dist/decorator/Mutation";
import response from "../../lib/io/response";
import UserFactory from "../domains/user/UserFactory";
import UserManager from "../domains/user/UserManager";

class AuthController implements ControllerInterface {
  @Mutation("register")
  async register(data) {
    try {
      const user = await UserFactory.createUser(data.input);
      await UserManager.save(user);
      return response.success({ user });
    } catch (e) {
      return response.error(e.message);
    }
  }

  /**
   * Not used in practice as auth using firebase is done on the app side
   * But useful for debugging
   * @param data
   * @param context
   */
  @Mutation("createTokenFromCredentials")
  async createTokenFromCredentials(data, context) {
   /* const loginResult = await UserManager.createTokenFromCredentials(
      data.input.emailAddress,
      data.input.password
    );
    if (loginResult.error) {
      return response.error(loginResult.error.message);
    }

    // Needed for @requireRole
    context.set("user", loginResult.value);

    return response.success({
      token: loginResult.value.token,
      refreshToken: loginResult.value.refreshToken,
      user: loginResult.value.user
    });*/
  }
}

export default AuthController;
