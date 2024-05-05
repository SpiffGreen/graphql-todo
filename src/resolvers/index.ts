import TodoResolver from "./todo.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [UserResolver, TodoResolver] as const;
