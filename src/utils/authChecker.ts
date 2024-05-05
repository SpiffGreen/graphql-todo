import { AuthChecker, Ctx } from "type-graphql";
import Context from "../types/context";
import { GraphQLError } from "graphql";
import { verifyJwt } from "./jwt";

const authChecker: AuthChecker<Context> = ({ context }: { context: any }) => {
  const { token } = context;
  if (!context.token) {
    throw new GraphQLError("Missing token", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }

  try {
    const [, jwtToken] = token.split(" ");
    const decoded = verifyJwt(jwtToken);
    context.user = decoded;
    return true;
  } catch (err) {
    throw new GraphQLError("Invalid token");
  }
};

export default authChecker;
