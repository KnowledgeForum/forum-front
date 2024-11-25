import DailyIcon from "@assets/new.svg";
import MonthsIcon from "@assets/months.svg";
import FollowIcon from "@assets/follow-menu.svg";

import AsideLayout from "@/layouts/Aside/AsideLayout";

import Link from "@/components/SubNavigation/Link/Link";

type NewsNavigationProps = {
  unReadCount?: number;
};

const NewsNavigation = ({ unReadCount }: NewsNavigationProps) => {
  return (
    <AsideLayout>
      <nav>
        <ul>
          <li>
            <Link
              data={{
                to: "/news/daily",
                icon: DailyIcon,
                title: "일일 뉴스",
                description: "오늘의 뉴스를 확인합니다.",
              }}
            />
          </li>
          <li>
            <Link
              data={{
                to: "/news/months",
                icon: MonthsIcon,
                title: "월간 뉴스",
                description: "이번 달 인기 뉴스를 확인합니다.",
              }}
            />
          </li>
          <li>
            <Link
              data={{
                to: "/news/follow",
                icon: FollowIcon,
                title: "팔로잉 뉴스",
                description: "팔로우 한 사람의 뉴스를 확인합니다.",
              }}
              unReadCount={unReadCount}
            />
          </li>
        </ul>
      </nav>
    </AsideLayout>
  );
};

export default NewsNavigation;
