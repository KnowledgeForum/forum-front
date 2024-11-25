import { RefObject, useEffect } from "react";

/**
 * endRef에 해당하는 요소가 화면에 보이면 callback 함수를 실행하는 hook
 * @param endRef 화면에 보이면 callback 함수를 실행하는 RefObject
 * @param callback 화면에 보이면 실행할 함수
 */
const useInfinityScroll = (endRef: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const endTarget = endRef.current;
    if (!endTarget) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        },
        { threshold: 0.1, root: endTarget },
      );
    });

    observer.observe(endTarget);

    return () => observer.disconnect();
  }, [callback, endRef]);
};

export default useInfinityScroll;
