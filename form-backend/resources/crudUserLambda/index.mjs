import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.TableName;

export const handler = async (event, context) => {
  let email;
  let connectionId;
  let body;
  let routeKey;
  
  if (event.body) {
        email = event.body.email || '';
  }
  
  if (event.requestContext.connectionId) {
    connectionId = event.requestContext.connectionId
    routeKey = event.requestContext.routeKey
  }
  
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (routeKey) {
      case "deleteUserRoute":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: connectionId,
            },
          })
        );
        body = `Deleted item ${connectionId}`;
        break;
      case "sendVerificationEmailRoute":
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              email: email,
              date: Date.now(),
              verified: false,
              id: connectionId
            },
          })
        );
        body = `Put item ${connectionId}`;
        break;
        case "updateClientRoute":
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              email: email,
              date: Date.now(),
              verified: true,
              id: connectionId
            },
          })
        );
        body = `Put item ${connectionId}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
