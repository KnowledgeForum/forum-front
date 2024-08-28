import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";

import classes from "@/layouts/Auth/AuthLayout.module.scss";

import { InputDataSet } from "@/types/react";

import AuthLayout from "@/layouts/Auth/AuthLayout";

import FormButton from "@/components/FormButton/FormButton";

import { validationEmail, validationPassword } from "@/utils/validation";

type InputKey = "email" | "password";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<InputDataSet<InputKey, string>>({
    email: {
      value: "",
      isError: false,
      errorMessage: "올바른 이메일 형식이 아닙니다.",
    },
    password: {
      value: "",
      isError: false,
      errorMessage: "8 ~ 16자 이내 및 영문, 숫자, 특수문자를 포함해야 합니다.",
    },
  });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isInitinal, setIsInitinal] = useState<boolean>(true);

  const isDisabled = useMemo(() => {
    return (
      isInitinal ||
      formData.email.isError ||
      formData.password.isError ||
      formData.email.value === "" ||
      formData.password.value === ""
    );
  }, [isInitinal, formData.email.isError, formData.email.value, formData.password.isError, formData.password.value]);

  const handleClickShowPassword = () => setIsShowPassword((show) => !show);

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  const checkValidationEmail = useCallback((email: string) => {
    const isValidate = validationEmail(email);

    setFormData((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        isError: !isValidate,
      },
    }));
  }, []);

  const checkValidationPassword = useCallback((password: string) => {
    const isValidate = validationPassword(password);

    setFormData((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        isError: !isValidate,
      },
    }));
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: InputKey) => {
      if (isInitinal) setIsInitinal(false);

      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          value: event.target.value,
        },
      }));

      switch (key) {
        case "email":
          checkValidationEmail(event.target.value);
          break;
        case "password":
          checkValidationPassword(event.target.value);
          break;
      }
    },
    [isInitinal, checkValidationEmail, checkValidationPassword],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // TODO: 로그인 API 호출
      console.table(formData);

      const params = new URLSearchParams(location.search);
      if (params.get("redirect")) {
        navigate(params.get("redirect") as string);
      } else {
        navigate("/");
      }
    },
    [formData, location.search, navigate],
  );

  return (
    <AuthLayout title="Knowledge 로그인" desc="Knowledge는 개발자를 위한 뉴스, 지식을 공유하는 웹 사이트입니다.">
      <form className={classes.children} onSubmit={handleSubmit}>
        <div className={classes.content}>
          <TextField
            type="email"
            autoComplete="off"
            label="이메일"
            variant="filled"
            value={formData.email.value}
            error={formData.email.isError}
            helperText={formData.email.isError && formData.email.errorMessage}
            onChange={(event) => handleChange(event, "email")}
          />
          <FormControl variant="filled">
            <InputLabel htmlFor="filled-adornment-password">비밀번호</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              autoComplete="off"
              value={formData.password.value}
              onChange={(event) => handleChange(event, "password")}
              type={isShowPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formData.password.isError && <FormHelperText error>{formData.password.errorMessage}</FormHelperText>}
          </FormControl>
          <span>
            <Link to="/find-password" className={classes.blue}>
              비밀번호 찾기
            </Link>
          </span>
          <div className={classes.link}>
            <span>아직 회원이 아니신가요?</span>{" "}
            <Link to="/register" className={classes.blue}>
              회원가입
            </Link>
          </div>
        </div>
        <FormButton text="로그인" width="100%" isDisabled={isDisabled} />
      </form>
    </AuthLayout>
  );
};

export default Login;
