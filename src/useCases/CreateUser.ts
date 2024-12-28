import AccessLevel from "@/entities/AccessLevel";
import Adress from "@/entities/Adress";
import Contact from "@/entities/Contact";
import PersonalData from "@/entities/PersonalData";
import Repository from "@/entities/Repository";
import User from "@/entities/User";

type UserDataParams = {
  username: string;
  password: string;
  access_level: AccessLevel;
  adress: Adress;
  contact: Contact;
  personal_data: PersonalData;
};

export default class CreateUser {
  constructor(private readonly userRepository: Repository) {}

  async execute(userData: UserDataParams): Promise<User> {
    const dbQueryResponse = await this.userRepository.getOne(userData.username);
    if (dbQueryResponse) throw new Error("User already registered.");

    const newUser = new User(userData);
    const savedUser = await this.userRepository.save(newUser);

    if (!savedUser) throw new Error("An internal server error occurred.");

    return newUser;
  }
}
