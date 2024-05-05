import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateTodoInput,
  DeleteTodoInput,
  EditTodoInput,
  Todo,
} from "../schema/todo.schema";
import Context from "../types/context";
import TodoService from "../service/todo.service";

@Resolver()
export default class TodoResolver {
  constructor(private todoService: TodoService) {
    this.todoService = new TodoService();
  }

  @Authorized()
  @Mutation(() => Todo)
  async createTodo(
    @Arg("input") input: CreateTodoInput,
    @Ctx() context: Context
  ) {
    return this.todoService.createTodo(context.user._id, input.title);
  }

  @Authorized()
  @Mutation(() => Todo)
  async editTodo(@Arg("input") input: EditTodoInput, @Ctx() context: Context) {
    return this.todoService.editTodo(
      context.user._id,
      input.title,
      input.todoID
    );
  }

  @Authorized()
  @Mutation(() => Todo)
  async deleteTodo(
    @Arg("input") input: DeleteTodoInput,
    @Ctx() context: Context
  ) {
    return this.todoService.deleteTodo(context.user._id, input.todoID);
  }

  @Authorized()
  @Query(() => [Todo])
  async getTodos(@Ctx() context: Context) {
    return this.todoService.getTodos(context.user._id);
  }
}
