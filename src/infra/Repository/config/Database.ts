import mongoose from "mongoose";

export default class Database {
  private static instance: Database;
  private readonly dbURI: string;

  constructor() {
    this.dbURI = process.env.DATABASE_URL ?? "";

    if (!this.dbURI) {
      throw new Error("Database url is required.");
    }

    this.setupEventListeners();
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect(): Promise<void> {
    try {
      console.log("Connecting to database...");
      await mongoose.connect(this.dbURI);
    } catch (error) {
      console.log("Could not connect to database server.", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      console.log("disconnecting from database...");
      await mongoose.disconnect();
    } catch (error) {
      console.log("Could not disconnect from database server.", error);
      throw error;
    }
  }

  private setupEventListeners(): void {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected.");
    });
  }
}
