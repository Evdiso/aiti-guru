import z from "zod";

export const maxNumberCheck = (options: {
  max?: number;
  required?: boolean;
}) => {
  return (value?: number) => {
    const cursorMaxCount = options.max ?? Infinity;

    const resultRequired = z
      .number()
      .nullable()
      .optional()
      .refine((val) => {
        const cursor = val ?? 0;
        return cursor > 0;
      })
      .safeParse(Number(value));

    const resultMaxValidLength = z
      .number()
      .nullable()
      .optional()
      .refine((val) => {
        const cursor = val ?? 0;
        return cursor <= cursorMaxCount;
      })
      .safeParse(Number(value));

    if (options.required && !resultRequired.success) {
      return "Обязательно для заполнения";
    }

    if (!resultMaxValidLength.success) {
      return `Значение не должно превышать ${cursorMaxCount}`;
    }
  };
};
