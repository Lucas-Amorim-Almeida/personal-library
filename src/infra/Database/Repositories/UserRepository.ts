import Repository from "@/domain/core/Repository";
import UserModel from "../Models/UserModel";
import User from "@/domain/core/User";

export default class UserRepository implements Repository {
  private readonly userModel;
  constructor() {
    this.userModel = UserModel.getModel();
  }

  async save<Input, Output>(data: Input): Promise<Output> {
    const user = data as User;

    const { username, password, access_level, contact, personal_data, status } =
      user.get();
    const userContactData = contact?.get();
    const userPersonalData = personal_data?.get();

    const dbUser = await this.userModel.create({
      username,
      password,
      access_level,
      contact: {
        email: userContactData?.email.get(),
        contact: userContactData?.phone.map((item) => item.get()),
      },
      personal_data: userPersonalData,
      status,
    });

    return dbUser as Output;
  }

  async getOne<Input, Output>(query: Input): Promise<Output | null> {
    const dbUser = await this.userModel.findOne(
      query as { username: string } | { id: string },
    );

    return dbUser as Output | null;
  }

  async update<Input, Output>(data: Input): Promise<Output> {
    const { query, update_fields } = data as {
      query: object;
      update_fields: object;
    };

    const updatedUser = await this.userModel.updateOne(query, update_fields);

    return updatedUser as Output;
  }

  async delete<Input, Output>(data: Input): Promise<Output> {
    const id = data as string;
    const deleteUser = await this.userModel.deleteOne({ id });
    return deleteUser as Output;
  }

  async getAll<Output>(): Promise<Output[]> {
    const users = await this.userModel.find();
    return users as Output[];
  }

  async getMany<Input, Output>(query: Input, take: number): Promise<Output[]> {
    const users = await this.userModel.find(query as object).limit(take);
    return users as Output[];
  }
}
