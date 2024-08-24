import { failedRedirectState, successRedirectState } from "@/recoil/redirect/atoms";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [successRedirectUri, setSuccessRedirectUri] = useRecoilState(successRedirectState);
  const failedRedirectUri = useRecoilValue(failedRedirectState);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isSuccess = params.get("success") ? Boolean(params.get("success")) : false;

    if (isSuccess) {
      const snsId = params.get("snsId");
      const additionalEmail = params.get("additionalEmail") ? Boolean(params.get("additionalEmail")) : false;

      if (additionalEmail && snsId) {
        setSuccessRedirectUri("/");
        navigate("/additional-email", {
          state: { snsId },
        });
        return;
      } else if (additionalEmail && !snsId) {
        navigate(failedRedirectUri || "/", {
          state: { errorMessage: params.get("message") || "로그인에 실패했습니다.\n나중에 다시 시도해주세요." },
        });
        return;
      }

      setSuccessRedirectUri("/");
      navigate(successRedirectUri || "/");
    } else {
      navigate(failedRedirectUri || "/", {
        state: { errorMessage: params.get("message") || "로그인에 실패했습니다.\n나중에 다시 시도해주세요." },
      });
    }
  }, [location, successRedirectUri, failedRedirectUri, navigate, setSuccessRedirectUri]);

  return <></>;
};

export default Callback;
