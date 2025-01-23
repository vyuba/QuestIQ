import { Client, ID, Account, Databases, Query, Storage } from "appwrite";
import { config } from "./env";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(config.projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { ID, account, databases, Query, storage };
