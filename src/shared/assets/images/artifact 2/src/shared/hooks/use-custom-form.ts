import { createFormHook } from "@tanstack/react-form";

import { FieldInput, FieldPassword, FieldCheckbox } from "../components";

import { fieldContext, formContext } from "../config/bootstrap";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FieldInput,
    FieldPassword,
    FieldCheckbox,
  },
  formComponents: {},
});

export const useCustomForm = () => {
  return {
    useAppForm,
  };
};
