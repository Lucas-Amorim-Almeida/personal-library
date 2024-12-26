import { PersonalDataParamsType } from "./@types/types";

export default class PersonalData {
  private name: string;
  private cpf: string;
  private birth_date: Date;
  private created_at?: Date;
  private updated_at?: Date;

  constructor(personalData: PersonalDataParamsType) {
    this.name = personalData.name;
    this.cpf = personalData.cpf;
    this.birth_date = personalData.birth_date;
    this.created_at = personalData.created_at;
    this.updated_at = personalData.updated_at;
  }

  public get(): {
    name: string;
    cpf: string;
    birth_date: Date;
    created_at?: Date;
    updated_at?: Date;
  } {
    return {
      name: this.name,
      cpf: this.cpf,
      birth_date: this.birth_date,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
