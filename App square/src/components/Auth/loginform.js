"use client";
import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { useRouter } from "@/i18n/routing";
import { TextField, Button, IconButton } from "@mui/material";
import { Eye, EyeOff } from "lucide-react"; // Importing lucide-react icons

const Spinner = () => (
  <div className="spinner">
    <style jsx>{`
      .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s ease infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsloading] = useState(true);
  
  const router = useRouter();
  const t = useTranslations("LoginForm");
  const locale = useLocale(); // Get the current locale (e.g., 'ar', 'en')
  
  const token = Cookies.get("token");

  // Determine the direction (RTL for Arabic, LTR for others)
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(
        "https://backend.profferdeals.com/api/admin/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const data = await response.json();
      const token = data.token;

      if (response.ok) {
        // Set token in cookies
        Cookies.set("token", token, { path: "/", expires: 1 });
        setErrorMessage("");
        // Redirect to dashboard after successful login
        router.push("/dashboard");
      } else {
        setErrorMessage(t("invalidLogin"));
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(t("errorLogin"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (token) {
      // Redirect to dashboard if already authenticated
      router.push("/dashboard");
    } else {
      setIsloading(false);
    }
  }, [router, token]);

  if (isloading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div className="flex justify-center items-center w-full h-full" dir={dir}>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-5 m-auto">
          <div>
            <TextField
              label={t("emailLabel")}
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t("mail_placeholder")}
              InputProps={{
                inputProps: {
                  style: { textAlign: locale === 'ar' ? 'right' : 'left' },
                },
              }}
            />
          </div>
          <div className="relative">
            <TextField
              label={t("passwordLabel")}
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={t("pass_placeholder")}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </IconButton>
                ),
              }}
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : t("login")}
          </Button>
          <div>
            <h1 className="text-sm">
              {t("noAccount")}{" "}
              <a href="#" className="text-blue-700">
                {t("registerNow")}
              </a>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
