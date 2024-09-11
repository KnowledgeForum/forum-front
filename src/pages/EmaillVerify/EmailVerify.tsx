import EmailVerifyLayout from "@/layouts/EmailVerify/EmailVerifyLayout";
import EnterInformation from "@/components/EnterInformation/EnterInformation";

const EmailVerify = () => {
  const emailButtonClick = () => {
    console.log();
  };

  return (
    <EmailVerifyLayout>
      <EnterInformation
        title="이메일 인증"
        description="해당 SNS 계정은 이메일이 누락되어 있습니다. 원활한 서비스를 위해 이메일을 인증해주세요."
        placeholder="이메일"
        buttonText="인증 번호 발송"
        inputType="email"
        onButtonClick={emailButtonClick}
      />
    </EmailVerifyLayout>
  );
};

export default EmailVerify;
