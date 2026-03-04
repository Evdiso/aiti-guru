import z from "zod";

export const passwordCheck = () => {
  return (value?: string) => {
    const resultRequired = z.string().min(1).safeParse(value);

    const resultValidLength = z
      .string()
      .nullable()
      .optional()
      .refine((val) => {
        const cursor = val ?? "";
        return cursor.length >= 6;
      })
      .safeParse(value);

    if (!resultRequired.success) {
      return "Обязательно для заполнения";
    }

    if (!resultValidLength.success) {
      return "Введите пароль не менее 6 символов";
    }
  };
};
