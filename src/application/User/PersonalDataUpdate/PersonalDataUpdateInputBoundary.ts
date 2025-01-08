import InputBoundary from "@/application/InputBoundary";

export default class PersonalDataUpdateInputBoundary
  implements
    InputBoundary<{ user_id: string; name?: string; birth_date?: Date }>
{
  private user_id: string;
  private name?: string;
  private birth_date?: Date;

  constructor(inputData: {
    user_id: string;
    name?: string;
    birth_date?: Date | string;
  }) {
    const { user_id, name, birth_date } = inputData;

    this.user_id = user_id;
    this.name = name;

    if (birth_date && typeof birth_date === "string") {
      const parsedDate = new Date(birth_date);
      if (isNaN(parsedDate.getTime())) {
        // Verifica se a data é inválida
        throw new Error("birth_date format is not valid.");
      }
      this.birth_date = parsedDate;
    } else if (birth_date instanceof Date) {
      this.birth_date = birth_date;
    } else if (birth_date) {
      throw new Error("birth_date format is not valid.");
    }
  }

  get(): { user_id: string; name?: string; birth_date?: Date } {
    return {
      user_id: this.user_id,
      name: this.name,
      birth_date: this.birth_date,
    };
  }
}
