import EmailVerifyLayout from "@/layouts/EmailVerify/EmailVerifyLayout";
// import classes from "./EmailVerify.module.scss";

const EmailVerify = () => {
  const emailData = {
    title: "이메일 인증",
    description: "해당 SNS 계정은 이메일이 누락되어 있습니다. 원할한 서비스를 위해 이메일을 인증해주세요.",
    placeholder: "이메일",
    buttonText: "인증 번호 발송",
  };
  /*
  const emailcodeData = {
    title: "인증 코드 입력",
    //description: {이메일} "해당 이메일로 인증 코드를 발송하였습니다.",
    placeholder: "인증 번호",
    buttonText: "이메일 변경",
  }
*/
  return (
    <EmailVerifyLayout emailData={emailData}>
      {/* <div className={classes.input}>
        <input type="text" placeholder="인증 번호" />
      </div>
      <button className={classes.button}>이메일 변경</button>  */}
    </EmailVerifyLayout>
  );
};

export default EmailVerify;
