import { TodoModel } from "../schema/todo.schema";

class TodoService {
  async createTodo(userID: string, title: string) {
    return TodoModel.create({ title, user: userID });
  }

  async editTodo(userID: string, title: string, todoID: string) {
    return TodoModel.findOneAndUpdate(
      { _id: todoID, user: userID },
      { title }
    ).lean();
  }

  async getTodos(userID: string) {
    return TodoModel.find({ user: { _id: userID } }).lean();
  }

  async deleteTodo(userID: string, todoID: string) {
    return TodoModel.findOneAndDelete({
      user: { _id: userID },
      _id: todoID,
    }).lean();
  }
}

export default TodoService;
