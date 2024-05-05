import { Prop, Ref, getModelForClass, index } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "./user.schema";
import { IsNotEmpty, MinLength } from "class-validator";

@ObjectType()
@index({ user: 1 })
export class Todo {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Field(() => String)
  @Prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Prop({ default: false })
  done: boolean;
}

export const TodoModel = getModelForClass(Todo);

@InputType()
export class CreateTodoInput {
  @IsNotEmpty()
  @MinLength(3)
  @Field(() => String)
  title: string;
}

@InputType()
export class EditTodoInput {
  @IsNotEmpty()
  @MinLength(3)
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @Field(() => String)
  todoID: string;
}

@InputType()
export class DeleteTodoInput {
  @IsNotEmpty()
  @Field(() => String)
  todoID: string;
}
