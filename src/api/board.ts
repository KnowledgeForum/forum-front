import { Board, BoardListWithType, DraftBoardList, UpdateBoardDetail } from "@/types/board";

import Bitcoin from "@assets/bitcoin.png";

export const BoardApi = {
  fetchRecentBoardAndNews: async ({ page, count }: { page: number; count: number }) => {
    console.log(page, count);

    // TODO: 최근 뉴스 또는 게시글 목록을 불러오는 API 호출
    const recentBoards: BoardListWithType = {
      boards: [
        {
          boardId: 1,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "최근 뉴스 또는 게시글 가져오기",
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          boardId: 2,
          boardType: "B",
          thumbnail: Bitcoin,
          title:
            "4단계를 통해 SEO 최적화 방법을 설명합니다.  SEO를 통해 어떻게 트래픽을 관리하고 어떤 방법을 사용하는 것이 가장 좋은 방법",
          tags: [
            { tagId: 3, tagName: "seo" },
            { tagId: 4, tagName: "blogging" },
            { tagId: 5, tagName: "traffic" },
          ],
          isLike: true,
          uploader: { userId: 3, nickname: "User_03", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 09:38:24",
        },
        {
          boardId: 3,
          boardType: "B",
          thumbnail: Bitcoin,
          title: "OnePay - 온라인 결제 처리 웹앱을 소개합니다. - xxx.com에서 다운로드",
          tags: [
            { tagId: 11, tagName: "onepay" },
            { tagId: 12, tagName: "online" },
            { tagId: 13, tagName: "webapp" },
          ],
          isLike: true,
          uploader: { userId: 4, nickname: "User_04", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 5,
          likeCount: 1,
          commentCount: 3,
          createdTime: "2024-06-17 12:30:45",
        },
        {
          boardId: 4,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1800개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-02-17 12:30:45",
        },
        {
          boardId: 5,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2022-01-17 12:30:45",
        },
      ],
      total: 16,
    };

    return recentBoards;
  },
  fetchRecentNews: async ({ page, count }: { page: number; count: number }) => {
    console.log(page, count);

    // TODO: 최근 뉴스를 불러오는 API 호출
    const recentNews: BoardListWithType = {
      boards: [
        {
          boardId: 1,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "뉴스를 사용한 프로젝트 구성",
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          boardId: 2,
          boardType: "B",
          thumbnail: Bitcoin,
          title:
            "4단계를 통해 SEO 최적화 방법을 설명합니다.  SEO를 통해 어떻게 트래픽을 관리하고 어떤 방법을 사용하는 것이 가장 좋은 방법",
          tags: [
            { tagId: 3, tagName: "seo" },
            { tagId: 4, tagName: "blogging" },
            { tagId: 5, tagName: "traffic" },
          ],
          isLike: true,
          uploader: { userId: 3, nickname: "User_03", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 09:38:24",
        },
        {
          boardId: 3,
          boardType: "B",
          thumbnail: Bitcoin,
          title: "OnePay - 온라인 결제 처리 웹앱을 소개합니다. - xxx.com에서 다운로드",
          tags: [
            { tagId: 11, tagName: "onepay" },
            { tagId: 12, tagName: "online" },
            { tagId: 13, tagName: "webapp" },
          ],
          isLike: true,
          uploader: { userId: 4, nickname: "User_04", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 5,
          likeCount: 1,
          commentCount: 3,
          createdTime: "2024-06-17 12:30:45",
        },
        {
          boardId: 4,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1800개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-02-17 12:30:45",
        },
        {
          boardId: 5,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2022-01-17 12:30:45",
        },
      ],
      total: 16,
    };

    return recentNews;
  },
  fetchRecentBoards: async ({ page, count }: { page: number; count: number }) => {
    console.log(page, count);

    // TODO: 최근 게시글 목록을 불러오는 API 호출
    const recentBoards: BoardListWithType = {
      boards: [
        {
          boardId: 1,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "비트코인을 사용한 프로젝트 구성",
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          boardId: 2,
          boardType: "B",
          thumbnail: Bitcoin,
          title:
            "4단계를 통해 SEO 최적화 방법을 설명합니다.  SEO를 통해 어떻게 트래픽을 관리하고 어떤 방법을 사용하는 것이 가장 좋은 방법",
          tags: [
            { tagId: 3, tagName: "seo" },
            { tagId: 4, tagName: "blogging" },
            { tagId: 5, tagName: "traffic" },
          ],
          isLike: true,
          uploader: { userId: 3, nickname: "User_03", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 09:38:24",
        },
        {
          boardId: 3,
          boardType: "B",
          thumbnail: Bitcoin,
          title: "OnePay - 온라인 결제 처리 웹앱을 소개합니다. - xxx.com에서 다운로드",
          tags: [
            { tagId: 11, tagName: "onepay" },
            { tagId: 12, tagName: "online" },
            { tagId: 13, tagName: "webapp" },
          ],
          isLike: true,
          uploader: { userId: 4, nickname: "User_04", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 5,
          likeCount: 1,
          commentCount: 3,
          createdTime: "2024-06-17 12:30:45",
        },
        {
          boardId: 4,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1800개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-02-17 12:30:45",
        },
        {
          boardId: 5,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2022-01-17 12:30:45",
        },
      ],
      total: 16,
    };

    return recentBoards;
  },
  fetchRecentFollowingBoards: async ({ page, count }: { page: number; count: number }) => {
    console.log(page, count);

    // TODO: 팔로잉 게시글 또는 뉴스 목록을 불러오는 API 호출
    const recentBoards: BoardListWithType = {
      boards: [
        {
          boardId: 1,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "팔로잉 뉴스 또는 게시글 가져오기",
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          boardId: 2,
          boardType: "B",
          thumbnail: Bitcoin,
          title:
            "4단계를 통해 SEO 최적화 방법을 설명합니다.  SEO를 통해 어떻게 트래픽을 관리하고 어떤 방법을 사용하는 것이 가장 좋은 방법",
          tags: [
            { tagId: 3, tagName: "seo" },
            { tagId: 4, tagName: "blogging" },
            { tagId: 5, tagName: "traffic" },
          ],
          isLike: true,
          uploader: { userId: 3, nickname: "User_03", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-08-17 09:38:24",
        },
        {
          boardId: 3,
          boardType: "B",
          thumbnail: Bitcoin,
          title: "OnePay - 온라인 결제 처리 웹앱을 소개합니다. - xxx.com에서 다운로드",
          tags: [
            { tagId: 11, tagName: "onepay" },
            { tagId: 12, tagName: "online" },
            { tagId: 13, tagName: "webapp" },
          ],
          isLike: true,
          uploader: { userId: 4, nickname: "User_04", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 5,
          likeCount: 1,
          commentCount: 3,
          createdTime: "2024-06-17 12:30:45",
        },
        {
          boardId: 4,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1800개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2024-02-17 12:30:45",
        },
        {
          boardId: 5,
          boardType: "N",
          thumbnail: Bitcoin,
          title: "사용자 인터페이스 설계 - 단 몇 달만에 1개의 공유를 기록한 방법",
          tags: [
            { tagId: 14, tagName: "design" },
            { tagId: 15, tagName: "user interface" },
            { tagId: 16, tagName: "designing" },
          ],
          isLike: false,
          uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
          viewCount: 651324,
          likeCount: 366545,
          commentCount: 30,
          createdTime: "2022-01-17 12:30:45",
        },
      ],
      total: 16,
    };

    return recentBoards;
  },
  fetchRecommendBoards: async () => {
    return {
      boards: [
        {
          boardId: 1,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "비극 속에서 한 사업을 매각하고 다른 사업을 확장하기",
          nickname: "User_01",
        },
        {
          boardId: 2,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "창업자로서의 정신 건강과 커뮤니티의 중요성 및 컨디션 관리를 어떻게 하는 게 좋을까?",
          nickname: "User_02",
        },
        {
          boardId: 3,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "1년 만에 비트코인으로 월 수익 $8,500",
          nickname: "User_03",
        },
        {
          boardId: 4,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "2024년 정신 건강과 부트스트래핑을 통한 창업",
          nickname: "User_04",
        },
        {
          boardId: 5,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "백엔드 개발자로 살아가는 방법",
          nickname: "User_05",
        },
        {
          boardId: 6,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "커뮤니티를 잘 사용하는 사람과 못 사용하는 사람의 차이점",
          nickname: "User_06",
        },
      ],
    };
  },
  fetchPopularBoards: async () => {
    return {
      boards: [
        {
          boardId: 1,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "비극 속에서 한 사업을 매각하고 다른 사업을 확장하기",
          nickname: "User_01",
        },
        {
          boardId: 2,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "창업자로서의 정신 건강과 커뮤니티의 중요성 및 컨디션 관리를 어떻게 하는 게 좋을까?",
          nickname: "User_02",
        },
        {
          boardId: 3,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "1년 만에 비트코인으로 월 수익 $8,500",
          nickname: "User_03",
        },
        {
          boardId: 4,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "2024년 정신 건강과 부트스트래핑을 통한 창업",
          nickname: "User_04",
        },
        {
          boardId: 5,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "백엔드 개발자로 살아가는 방법",
          nickname: "User_05",
        },
        {
          boardId: 6,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          title: "커뮤니티를 잘 사용하는 사람과 못 사용하는 사람의 차이점",
          nickname: "User_06",
        },
      ],
    };
  },
  fetchBoardDetail: async (boardId: number): Promise<Board> => {
    console.log("fetch Board Detail : ", boardId);

    return {
      boardId: 1,
      boardType: "N",
      title: "비트코인을 사용한 프로젝트 구성",
      content: `<h3 style="margin-left: 0px !important">알고리즘 테스트 1에 대한 설명입니다.</h3><p style="margin-left: 0px !important">이번 알고리즘은 굉장히 쉬운 산수 문제입니다.</p><p style="margin-left: 0px !important">두 수를 입력받고 두 수의 합을 출력하면 되는 문제입니다.</p><p style="margin-left: 0px !important">예를 들어, 1 + 1은 2라는 결과 값이 나오면 됩니다.</p><p style="margin-left: 0px !important">테스트 케이스는 다음과 같습니다.</p><table><tbody><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important"><strong>입력</strong></p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important"><strong>출력</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">1,1</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">2</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">2,3</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">5</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">4,5</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">9</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">4,2</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">6</p></td></tr></tbody></table><hr><p style="margin-left: 0px !important">숫자를 입력받기 위해서는 Scanner를 사용하면 됩니다.</p><pre><code class="language-java">import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int a = s.nextInt();
  }
}</code></pre><p style="margin-left: 0px !important">주의하실 점은 <u>import</u>를 꼭 해줘야 하는 겁니다!</p><p style="margin-left: 0px !important"></p><p style="margin-left: 0px !important">바로 정답을 보겠습니다.</p><pre><code class="language-java">import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int a = s.nextInt();
    int b = s.nextInt();

    System.out.println(a + b);
  }
}</code></pre>`,
      thumbnail: null,
      tags: [
        { tagId: 1, tagName: "finace" },
        { tagId: 2, tagName: "bitcoin" },
      ],
      isLike: false,
      uploader: { userId: 2, nickname: "User_02", profilePath: "https://avatars.githubusercontent.com/u/1" },
      viewCount: 1651324,
      likeCount: 366545,
      commentCount: 30,
      createdTime: "2024-08-17 12:30:45",
    };
  },
  fetchBoardDetailByUpdate: async (boardId: number): Promise<UpdateBoardDetail> => {
    console.log("fetch Board Detail : ", boardId);

    return {
      boardId: 1,
      boardType: "N",
      title: "비트코인을 사용한 프로젝트 구성",
      content: `<h3 style="margin-left: 0px !important">알고리즘 테스트 1에 대한 설명입니다.</h3><p style="margin-left: 0px !important">이번 알고리즘은 굉장히 쉬운 산수 문제입니다.</p><p style="margin-left: 0px !important">두 수를 입력받고 두 수의 합을 출력하면 되는 문제입니다.</p><p style="margin-left: 0px !important">예를 들어, 1 + 1은 2라는 결과 값이 나오면 됩니다.</p><p style="margin-left: 0px !important">테스트 케이스는 다음과 같습니다.</p><table><tbody><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important"><strong>입력</strong></p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important"><strong>출력</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">1,1</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">2</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">2,3</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">5</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">4,5</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">9</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">4,2</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">6</p></td></tr></tbody></table><hr><p style="margin-left: 0px !important">숫자를 입력받기 위해서는 Scanner를 사용하면 됩니다.</p><pre><code class="language-java">import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int a = s.nextInt();
  }
}</code></pre><p style="margin-left: 0px !important">주의하실 점은 <u>import</u>를 꼭 해줘야 하는 겁니다!</p><p style="margin-left: 0px !important"></p><p style="margin-left: 0px !important">바로 정답을 보겠습니다.</p>
<pre><code class="language-java">import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int a = s.nextInt();
    int b = s.nextInt();
    System.out.println(a + b);
  }
}</code></pre>`,
      thumbnail: Bitcoin,
      tags: [
        { tagId: 1, tagName: "finace" },
        { tagId: 2, tagName: "bitcoin" },
      ],
      imageIds: [1, 2, 3],
      createdTime: "2024-08-17 12:30:45",
    };
  },
  fetchDraftBoards: async (): Promise<DraftBoardList> => {
    return {
      drafts: [
        {
          draftId: 1,
          boardType: "N",
          title: null,
          content: `<h3 style="margin-left: 0px !important">알고리즘 테스트 1에 대한 설명입니다.</h3><p style="margin-left: 0px !important">이번 알고리즘은 굉장히 쉬운 산수 문제입니다.</p><p style="margin-left: 0px !important">두 수를 입력받고 두 수의 합을 출력하면 되는 문제입니다.</p><p style="margin-left: 0px !important">예를 들어, 1 + 1은 2라는 결과 값이 나오면 됩니다.</p><p style="margin-left: 0px !important">테스트 케이스는 다음과 같습니다.</p><table><tbody><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important"><strong>입력</strong></p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important"><strong>출력</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">1,1</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">2</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">2,3</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">5</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">4,5</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">9</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">4,2</p></td><td colspan="1" rowspan="1" colwidth="628"><p style="margin-left: 0px !important">6</p></td></tr></tbody></table><hr><p style="margin-left: 0px !important">숫자를 입력받기 위해서는 Scanner를 사용하면 됩니다.</p><pre><code class="language-java">import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int a = s.nextInt();
  }
}</code></pre><p style="margin-left: 0px !important">주의하실 점은 <u>import</u>를 꼭 해줘야 하는 겁니다!</p><p style="margin-left: 0px !important"></p><p style="margin-left: 0px !important">바로 정답을 보겠습니다.</p><pre><code class="language-java">import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int a = s.nextInt();
    int b = s.nextInt();

    System.out.println(a + b);
  }
}</code></pre>`,
          thumbnail: null,
          tags: [
            { tagId: 1, tagName: "finace" },
            { tagId: 2, tagName: "bitcoin" },
          ],
          imageIds: null,
          createdTime: "2024-08-17 12:30:45",
        },
        {
          draftId: 2,
          boardType: "B",
          title: "타이틀",
          content: null,
          thumbnail: "https://avatars.githubusercontent.com/seungyong",
          tags: null,
          imageIds: [1, 2, 3],
          createdTime: "2024-08-15 09:30:45",
        },
      ],
    };
  },
  likeBoard: async (boardId: number) => {
    console.log("like", boardId);
  },
  unLikeBoard: async (boardId: number) => {
    console.log("unlike", boardId);
  },
};
