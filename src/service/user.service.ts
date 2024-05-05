import { AuthenticationError } from "type-graphql";
import { UserModel } from "../schema/user.schema";
import Context from "../types/context";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";
import { GraphQLError } from "graphql";

class UserService {
  async createUser(input: any) {
    const oldUser = await UserModel.findOne({ email: input.email }).lean();

    if (oldUser)
      throw new GraphQLError("User already exists", {
        extensions: {
          code: "BADREQUEST",
        },
      });

    return UserModel.create(input);
  }

  async login(input: any, context: Context) {
    // login user
    const user = await UserModel.findOne({ email: input.email }).lean();

    if (!user) {
      throw new AuthenticationError("Invalid email or password");
    }

    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) throw new AuthenticationError("Invalid password");

    // sign a jwt
    const token = signJwt(user);

    return token;
  }

  async getProfile(email: string) {
    const user = await UserModel.find().findByEmail(email).lean();
    return user;
  }
}

export default UserService;
