import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SessionStorageKey } from "@/utils/constants";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isSuccess = params.get("success") ? Boolean(params.get("success")) : false;
    const successRedirectUri = sessionStorage.getItem(SessionStorageKey.SUCCESS_REDIRECT_STATE);
    const failedRedirectUri = sessionStorage.getItem(SessionStorageKey.FAILED_REDIRECT_STATE);

    if (isSuccess) {
      const snsId = params.get("snsId");
      const additionalEmail = params.get("additionalEmail") ? Boolean(params.get("additionalEmail")) : false;

      if (additionalEmail && snsId) {
        navigate("/additional-email", {
          state: { snsId },
        });
        return;
      } else if (additionalEmail && !snsId) {
        navigate(sessionStorage.getItem(SessionStorageKey.FAILED_REDIRECT_STATE) || "/", {
          state: { errorMessage: params.get("message") || "로그인에 실패했습니다.\n나중에 다시 시도해주세요." },
        });
        return;
      }

      sessionStorage.removeItem(SessionStorageKey.SUCCESS_REDIRECT_STATE);
      navigate(successRedirectUri || "/");
    } else {
      navigate(failedRedirectUri || "/", {
        state: { errorMessage: params.get("message") || "로그인에 실패했습니다.\n나중에 다시 시도해주세요." },
      });
    }
  }, [location, navigate]);

  return <></>;
};

export default Callback;
