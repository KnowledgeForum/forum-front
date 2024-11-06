import { useCallback, useMemo, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
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

type InputKey = "email" | "password" | "passwordConfirm" | "nickname";

const Register = () => {
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
    passwordConfirm: {
      value: "",
      isError: false,
      errorMessage: "비밀번호가 일치하지 않습니다.",
    },
    nickname: {
      value: "",
      isError: false,
      errorMessage: "닉네임은 2 ~ 10자 이내로 입력해주세요.",
    },
  });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState<boolean>(false);
  const [isInitinal, setIsInitinal] = useState<boolean>(true);
  const [isAgreeTerms, setIsAgreeTerms] = useState<boolean>(false);
  const [isAgreeNotification, setIsAgreeNotification] = useState<boolean>(false);
  const [isAgreeEvent, setIsAgreeEvent] = useState<boolean>(false);

  const isDisabled = useMemo(() => {
    return (
      isInitinal ||
      formData.email.isError ||
      formData.email.value.trim() === "" ||
      formData.password.isError ||
      formData.password.value.trim() === "" ||
      formData.passwordConfirm.isError ||
      formData.passwordConfirm.value.trim() === "" ||
      formData.nickname.isError ||
      formData.nickname.value.trim() === "" ||
      !isAgreeTerms
    );
  }, [
    formData.email.isError,
    formData.email.value,
    formData.nickname.isError,
    formData.nickname.value,
    formData.password.isError,
    formData.password.value,
    formData.passwordConfirm.isError,
    formData.passwordConfirm.value,
    isAgreeTerms,
    isInitinal,
  ]);

  const handleIsShowPassword = useCallback(() => setIsShowPassword((show) => !show), []);
  const handleIsShowPasswordConfirm = useCallback(() => setIsShowPasswordConfirm((show) => !show), []);
  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);
  const handleAgreeTerms = useCallback(() => setIsAgreeTerms((agree) => !agree), []);
  const handleAgreeNotification = useCallback(() => setIsAgreeNotification((agree) => !agree), []);
  const handleAgreeEvent = useCallback(() => setIsAgreeEvent((agree) => !agree), []);

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

  const checkValidationPassword = useCallback(
    (password: string) => {
      const isValidate = validationPassword(password);

      setFormData((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          isError: !isValidate,
        },
      }));

      const isSame = formData.passwordConfirm.value === password;
      setFormData((prev) => ({
        ...prev,
        passwordConfirm: {
          ...prev.passwordConfirm,
          isError: !isSame,
        },
      }));
    },
    [formData.passwordConfirm.value],
  );

  const checkValidationPasswordConfirm = useCallback(
    (confirmPassword: string) => {
      const isSame = formData.password.value === confirmPassword;

      setFormData((prev) => ({
        ...prev,
        passwordConfirm: {
          ...prev.passwordConfirm,
          isError: !isSame,
        },
      }));
    },
    [formData.password.value],
  );

  const checkValidationNickname = useCallback((nickname: string) => {
    const isValidate = nickname.length >= 2 && nickname.length <= 10;

    setFormData((prev) => ({
      ...prev,
      nickname: {
        ...prev.nickname,
        isError: !isValidate,
      },
    }));
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: InputKey) => {
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
        case "passwordConfirm":
          checkValidationPasswordConfirm(event.target.value);
          break;
        case "nickname":
          checkValidationNickname(event.target.value);
          break;
      }
    },
    [
      isInitinal,
      checkValidationEmail,
      checkValidationNickname,
      checkValidationPassword,
      checkValidationPasswordConfirm,
    ],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!isAgreeTerms) {
        return;
      }

      console.table({ ...formData, isAgreeTerms, isAgreeNotification, isAgreeEvent });
    },
    [formData, isAgreeEvent, isAgreeNotification, isAgreeTerms],
  );

  return (
    <AuthLayout title="Knowledge 회원가입" desc="Knowledge는 개발자를 위한 뉴스, 지식을 공유하는 웹 사이트입니다.">
      <form className={classes.children} onSubmit={handleSubmit}>
        <div className={classes.content}>
          <TextField
            required
            type="email"
            autoComplete="off"
            label="이메일"
            variant="filled"
            value={formData.email.value}
            error={formData.email.isError}
            helperText={formData.email.isError && formData.email.errorMessage}
            color={formData.email.isError ? "error" : "primary"}
            onChange={(event) => handleChange(event, "email")}
          />
          <FormControl variant="filled">
            <InputLabel htmlFor="filled-adornment-password">비밀번호</InputLabel>
            <FilledInput
              required
              id="filled-adornment-password"
              autoComplete="off"
              value={formData.password.value}
              onChange={(event) => handleChange(event, "password")}
              type={isShowPassword ? "text" : "password"}
              color={formData.password.isError ? "error" : "primary"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleIsShowPassword}
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
          <FormControl variant="filled">
            <InputLabel htmlFor="filled-adornment-confirm-password">비밀번호 확인</InputLabel>
            <FilledInput
              required
              id="filled-adornment-confirm-password"
              autoComplete="off"
              value={formData.passwordConfirm.value}
              onChange={(event) => handleChange(event, "passwordConfirm")}
              type={isShowPasswordConfirm ? "text" : "password"}
              color={formData.passwordConfirm.isError ? "error" : "primary"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleIsShowPasswordConfirm}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {isShowPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formData.passwordConfirm.isError && (
              <FormHelperText error>{formData.passwordConfirm.errorMessage}</FormHelperText>
            )}
          </FormControl>
          <TextField
            required
            type="text"
            autoComplete="off"
            label="닉네임"
            variant="filled"
            value={formData.nickname.value}
            error={formData.nickname.isError}
            helperText={formData.nickname.isError && formData.nickname.errorMessage}
            onChange={(event) => handleChange(event, "nickname")}
            color={formData.nickname.isError ? "error" : "primary"}
          />
          <span className={classes.link}>
            <span>이미 회원이신가요?</span>
            <Link to="/login" className={classes.blue}>
              로그인
            </Link>
          </span>
        </div>
        <div className={classes.btnBox}>
          <p className={classes.item}>
            <FormControlLabel
              label={
                <>
                  <Link to="/terms-of-use">이용약관 동의</Link>과 <Link to="/privacy-policy">개인정보 처리방침</Link>에
                  동의합니다. (필수)
                </>
              }
              control={
                <Checkbox
                  checked={isAgreeTerms}
                  sx={{
                    color: "#ff6934",
                    "&.Mui-checked": {
                      color: "#ff6934",
                    },
                  }}
                />
              }
              onChange={handleAgreeTerms}
            />
          </p>
          <p className={classes.item}>
            <FormControlLabel
              label="일반적인 알림 수신(게시글, 댓글 등)에 동의합니다. (선택)"
              control={
                <Checkbox
                  checked={isAgreeNotification}
                  sx={{
                    color: "#ff6934",
                    "&.Mui-checked": {
                      color: "#ff6934",
                    },
                  }}
                />
              }
              onChange={handleAgreeNotification}
            />
          </p>
          <p className={classes.item}>
            <FormControlLabel
              label="이벤트 및 프로모션 알림 수신에 동의합니다. (선택)"
              control={
                <Checkbox
                  checked={isAgreeEvent}
                  sx={{
                    color: "#ff6934",
                    "&.Mui-checked": {
                      color: "#ff6934",
                    },
                  }}
                />
              }
              onChange={handleAgreeEvent}
            />
          </p>
        </div>
        <FormButton text="회원가입" width="100%" isDisabled={isDisabled} />
      </form>
    </AuthLayout>
  );
};

export default Register;
