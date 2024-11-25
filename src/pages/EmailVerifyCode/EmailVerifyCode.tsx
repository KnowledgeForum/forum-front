import { useState } from "react";
import EmailVerifyLayout from "@/layouts/EmailVerify/EmailVerifyLayout";
import EnterInformation from "@/components/EnterInformation/EnterInformation";

const EmailVerifyCode = () => {
  const [codeInput, setCodeInput] = useState<string>("");

  const codeButtonClick = () => {
    const codeRegExp = /^[A-Za-z0-9]{6}$/;
    const isCodeValid = codeRegExp.test(codeInput);
    console.log("click:", codeInput);
    console.log("이메일 유효성 검사 : ", isCodeValid);
  };

  const handleCodeInput = (value: string) => {
    setCodeInput(value);
  };

  return (
    <EmailVerifyLayout>
      <EnterInformation
        title="인증 코드 입력"
        description="“seungyong20@nver.com” 해당 이메일로 인증 코드를 발송하였습니다."
        placeholder="인증번호"
        buttonText="이메일 변경"
        inputType="text"
        onButtonClick={codeButtonClick}
        onChange={handleCodeInput}
      />
    </EmailVerifyLayout>
  );
};

export default EmailVerifyCode;
