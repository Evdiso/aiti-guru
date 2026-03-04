import { useCustomForm } from "../../../../shared/hooks/use-custom-form";
import styles from "./styles.module.css";
import { UserRoundIcon } from "lucide-react";
import { Button } from "../../../../shared/components/button";
import { Divider } from "./divider.tsx";
import { useMutation } from "@tanstack/react-query";
import { authQueryOptions } from "../../query";
import { lengthTextCheck } from "../../../../shared/validators/text.ts";
import { passwordCheck } from "../../../../shared/validators/password.ts";
import Cookies from "js-cookie";
import { toast } from "../../../../shared/config/bootstrap.ts";
import { useNavigate } from "react-router";

export const AuthForm = () => {
  const navigate = useNavigate();
  const { useAppForm } = useCustomForm();

  const form = useAppForm({
    defaultValues: {
      login: "",
      password: "",
      agree: false,
    },
    validators: {
      onSubmit: ({ value }) => {
        return {
          fields: {
            login: lengthTextCheck({ min: 4 })(value.login),
            password: passwordCheck()(value.password),
          },
        };
      },
    },
    onSubmit: ({ value }) => {
      mutation.mutate({ username: value.login, password: value.password });
    },
  });

  const mutation = useMutation({
    ...authQueryOptions,
    onError: () => {
      toast.store.create({
        type: "error",
        description: `Произошла ошибка при авторизации`,
        duration: 3000,
      });
    },
    onSuccess: (data) => {
      if (form.store.state.values.agree) {
        Cookies.set("app_accessToken", data.accessToken, {
          secure: true,
        });
      } else {
        sessionStorage.setItem("app_accessToken", data.accessToken);
      }

      toast.store.create({
        type: "success",
        description: `Добро пожаловать ${data.firstName} ${data.firstName} !`,
        duration: 3000,
      });

      navigate("/list");
    },
  });

  return (
    <div className={styles.wrapper}>
      <form.AppForm>
        <form.AppField
          name={"login"}
          children={(field) => (
            <field.FieldInput
              label={"Логин"}
              placeholder={"Введите логин"}
              iconLeft={
                <UserRoundIcon
                  size={24}
                  color={"var(--secondary-text-light)"}
                />
              }
            />
          )}
        />

        <form.AppField
          name={"password"}
          children={(field) => (
            <field.FieldPassword
              label={"Пароль"}
              placeholder={"Введите пароль"}
            />
          )}
        />

        <form.AppField
          name={"agree"}
          children={(field) => (
            <field.FieldCheckbox label={"Запомнить данные"} />
          )}
        />
      </form.AppForm>

      <Button onClick={form.handleSubmit}>Войти</Button>

      <Divider />
    </div>
  );
};
