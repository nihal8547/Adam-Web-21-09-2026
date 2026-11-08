import config from "@payload-config";
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";

const playgroundHandler = GRAPHQL_PLAYGROUND_GET(config);

export async function GET(req: Request) {
  // Disable GraphQL Playground in production to prevent schema introspection & reconnaissance
  if (process.env.NODE_ENV === "production" && !process.env.ENABLE_GRAPHQL_PLAYGROUND) {
    return new Response("Not Found", { status: 404 });
  }
  return playgroundHandler(req);
}
