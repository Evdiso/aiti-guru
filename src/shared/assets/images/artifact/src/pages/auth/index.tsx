import {
  Layout,
  AuthForm,
  FormWrapper,
  Header,
  Footer,
} from "../../features/auth";

export const AuthPage = () => {
  return (
    <Layout>
      <FormWrapper>
        <Header />
        <AuthForm />
        <Footer />
      </FormWrapper>
    </Layout>
  );
};
