import { Handler } from "@netlify/functions";
import myitemtype, { Args } from "../../../dataTypes/bubly";
import { RouterInfo } from "baguette-connector-sdk";
const getArgs: (
  event: Parameters<Handler>[0],
  context: Parameters<Handler>[1]
) => Args = (event, context) => {
  return event.queryStringParameters as unknown as Args;
};
const routeInfo: RouterInfo = { Path: ".netlify/functions/bubly" };
export const handler: Handler = async (event, context) => {
  const data = await myitemtype.call(getArgs(event, context), routeInfo);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
