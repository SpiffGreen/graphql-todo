import {
  Prop,
  getModelForClass,
  index,
  pre,
  queryMethod,
} from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User["email"]
) {
  return this.findOne();
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>("save", async function () {
  // Check that the password is being modified
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserModel = getModelForClass(User);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, {
    message: "password must be at least 6 characters long",
  })
  @MaxLength(50, {
    message: "password must not be longer than 50 characters",
  })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
