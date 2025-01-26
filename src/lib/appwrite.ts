import { Client, ID, Account, Databases, Query, Storage } from "appwrite";
import { config } from "./env";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(config.projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const result = storage.getFilePreview(
  config.bucketId, // bucketId
  "67954b7e0020f8d72c08" // fileId
);

export { ID, account, databases, Query, storage, result };
