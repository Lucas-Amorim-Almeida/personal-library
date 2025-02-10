import { model, Schema } from "mongoose";
import { IContact, IPersonalData, IUser } from "../interfaces/User";
import AccessLevel from "@/domain/core/AccessLevel";
import UserStatus from "@/domain/core/UserStatus";

export default class UserModel {
  private static ContactSchema = new Schema<IContact>(
    {
      email: { type: String, required: true },
      phone: [{ type: String }],
    },
    { timestamps: true }, // Ativa createdAt e updatedAt
  );

  private static PersonalDataSchema = new Schema<IPersonalData>(
    {
      name: { type: String },
      birth_date: { type: Date },
    },
    { timestamps: true }, // Ativa createdAt e updatedAt
  );

  private static schema: Schema<IUser> = new Schema<IUser>(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      access_level: {
        type: String,
        enum: Object.values(AccessLevel),
        required: true,
      },
      contact: this.ContactSchema, // Usa o subschema
      personal_data: this.PersonalDataSchema, // Usa o subschema,
      status: { type: String, enum: Object.values(UserStatus) },
    },
    { timestamps: true },
  );

  static getModel() {
    return model<IUser>("User", this.schema);
  }
}
