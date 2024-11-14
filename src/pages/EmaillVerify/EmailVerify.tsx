import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EmailVerifyLayout from "@/layouts/EmailVerify/EmailVerifyLayout";
import EnterInformation from "@/components/EnterInformation/EnterInformation";

const EmailVerify = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const navigate = useNavigate();

  const emailButtonClick = () => {
    const emailRegExp = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const isEmailValid = emailRegExp.test(emailInput);

    if (isEmailValid) {
      //email/verify/code페이지 이동 후 emailInput값 code에 넘기기
      //emailRegExp 맞지 않으면 페이지 이동 안함
      navigate("/email/verify/code", { state: { emailInput } });
    }

    console.log("click : ", emailInput);
    console.log("이메일 유효성 검사 : ", isEmailValid);
  };

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  return (
    <EmailVerifyLayout>
      <EnterInformation
        title="이메일 인증"
        description="해당 SNS 계정은 이메일이 누락되어 있습니다. 원활한 서비스를 위해 이메일을 인증해주세요."
        buttonText="인증 번호 발송"
        onButtonClick={emailButtonClick}
        isButtonDisabled={!emailInput} // emailInput이 없으면 버튼 비활성화
      >
        <TextField
          variant="filled"
          type="email"
          label="이메일"
          onChange={handleEmailInput}
          value={emailInput}
          style={{
            width: "26.875rem",
            height: "3.25rem",
            marginTop: "1.25rem",
            borderRadius: "0.5rem",
          }}
        />
      </EnterInformation>
    </EmailVerifyLayout>
  );
};

export default EmailVerify;
