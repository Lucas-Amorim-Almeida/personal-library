export default class Utils {
  static define<T extends Record<string, string | number>>(
    enumObj: T,
    param: string,
    descriptionn: string,
  ): T[keyof T] {
    const enumValues = Object.values(enumObj) as string[];

    if (!enumValues.includes(param.toUpperCase())) {
      throw new Error(`${descriptionn} is not valid.`);
    }

    const keyOfT = Object.keys(enumObj).find(
      (key) => enumObj[key as keyof T] === param.toUpperCase(),
    );
    if (!keyOfT) {
      throw new Error(`${descriptionn} is not valid.`);
    }

    return enumObj[keyOfT as keyof T];
  }
}
