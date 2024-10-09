import LoginForm from "@/components/Auth/loginform";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>تسجيل الدخول | App square</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen max-h-screen h-screen overflow-hidden">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;