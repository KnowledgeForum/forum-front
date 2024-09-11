import EmailVerifyLayout from "@/layouts/EmailVerify/EmailVerifyLayout";
import EnterInformation from "@/components/EnterInformation/EnterInformation";

const EmailVerifyCode = () => {
  const codeButtonClick = () => {
    console.log();
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
      />
    </EmailVerifyLayout>
  );
};

export default EmailVerifyCode;
