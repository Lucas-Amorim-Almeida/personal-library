import { model, Schema } from "mongoose";
import { IContact, IPersonalData, IUser } from "../interfaces/User";
import AccessLevel from "@/domain/core/AccessLevel";

export default class UserModel {
  private schema: Schema<IUser>;
  constructor() {
    const ContactSchema = new Schema<IContact>(
      {
        email: { type: String, required: true },
        phone: [{ type: String }],
      },
      { timestamps: true }, // Ativa createdAt e updatedAt
    );

    const PersonalDataSchema = new Schema<IPersonalData>(
      {
        name: { type: String },
        birth_date: { type: Date },
      },
      { timestamps: true }, // Ativa createdAt e updatedAt
    );

    this.schema = new Schema<IUser>(
      {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        access_level: {
          type: String,
          enum: Object.values(AccessLevel),
          required: true,
        },
        contact: ContactSchema, // Usa o subschema
        personal_data: PersonalDataSchema, // Usa o subschema,
      },
      { timestamps: true },
    );
  }

  getModel() {
    return model<IUser>("User") || model<IUser>("User", this.schema);
  }
}
