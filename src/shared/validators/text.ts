import z from "zod";

export const lengthTextCheck = (options: { max?: number; min?: number }) => {
  return (value?: string) => {
    const cursorMaxCount = options.max ?? 300;
    const cursorMinCount = options.min ?? 3;

    const resultRequired = z.string().min(1).safeParse(value);

    const resultMaxValidLength = z
      .string()
      .nullable()
      .optional()
      .refine((val) => {
        const cursor = val ?? "";
        return cursor.length <= cursorMaxCount;
      })
      .safeParse(value);

    const resultMinValidLength = z
      .string()
      .nullable()
      .optional()
      .refine((val) => {
        const cursor = val ?? "";
        return cursor.length >= cursorMinCount;
      })
      .safeParse(value);

    if (!resultRequired.success) {
      return "Обязательно для заполнения";
    }

    if (!resultMaxValidLength.success) {
      return `Длина не должна превышать ${cursorMaxCount}`;
    }

    if (!resultMinValidLength.success) {
      return `Длина не должна быть менее ${cursorMinCount}`;
    }
  };
};
