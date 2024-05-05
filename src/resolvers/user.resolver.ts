import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, LoginInput, User } from "../schema/user.schema";
import UserService from "../service/user.service";
import Context from "../types/context";

@Resolver()
export default class UserResolver {

  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  async createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String) // Return a jwt
  login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Authorized()
  @Query(() => User)
  me(@Ctx() context: Context) {
    return this.userService.getProfile(context.user.email);
  }
}