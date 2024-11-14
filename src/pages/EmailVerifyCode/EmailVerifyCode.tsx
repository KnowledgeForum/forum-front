import { useState } from "react";
import { TextField } from "@mui/material";
import { useLocation } from "react-router-dom";

import EmailVerifyLayout from "@/layouts/EmailVerify/EmailVerifyLayout";
import EnterInformation from "@/components/EnterInformation/EnterInformation";

const EmailVerifyCode = () => {
  const [codeInput, setCodeInput] = useState<string>("");
  const location = useLocation();

  // 전달된 state에서 emailInput 값을 가져옴
  const emailInput = location.state?.emailInput || "";

  const codeButtonClick = () => {
    const codeRegExp = /^[A-Za-z0-9]{6}$/;
    const isCodeValid = codeRegExp.test(codeInput);
    console.log("click:", codeInput);
    console.log("이메일 유효성 검사 : ", isCodeValid);
  };

  const handleCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeInput(event.target.value);
  };

  return (
    <EmailVerifyLayout>
      <EnterInformation
        title="인증 코드 입력"
        description={`“${emailInput}” 해당 이메일로 인증 코드를 발송하였습니다.`}
        onButtonClick={codeButtonClick}
        buttonText="이메일 변경"
        isButtonDisabled={!codeInput} // emailInput이 없으면 버튼 비활성화
      >
        <TextField
          variant="filled"
          type="text"
          label="인증번호"
          onChange={handleCodeInput}
          value={codeInput}
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

export default EmailVerifyCode;
