import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import classes from "./Login.module.scss";

import LogoIcon from "/public/logo-color.svg";

import { InputDataSet } from "@/types/react";

import Sns from "@/features/Sns/Sns";

import CenterTitle from "@/components/CenterTitle/CenterTitle";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isInitinal, setIsInitinal] = useState<boolean>(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
    <form className={classes.login} onSubmit={handleSubmit}>
      <img src={LogoIcon} alt="로고 이미지" width={45} height={45} />
      <CenterTitle title="Knowledge 로그인" desc="Knowledge는 개발자를 위한 뉴스, 지식을 공유하는 웹 사이트입니다." />
      <Sns />
      <div className={classes.line} />
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
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
        <div className={classes.signup}>
          <span>아직 회원이 아니신가요?</span>
          <Link to="/signup" className={classes.blue}>
            회원가입
          </Link>
        </div>
      </div>
      <FormButton
        text="로그인"
        width="100%"
        isDisabled={isInitinal || formData.email.isError || formData.password.isError}
      />
    </form>
  );
};

export default Login;
