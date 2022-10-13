# 원티드 프론트엔드 프리온보딩 챌린지 3차 - 2번째 과제

nextjs 를 이용해 md를 파싱해서 보여주는 블로그를 SSG로 만들어 배포하는 과제입니다

Github을 이용해 SSG 를 배포했었는데, 과제 추가 액션아이템인 `SWR`을 적용하다보니 불가피하게 API 서버가 필요해져서,

Vercel을 이용해 배포했어요 [링크](https://nextjs-ssg-md-blog.vercel.app/nextjs-ssg-md-blog)

## 요구사항

- \_\_posts 폴더에 md 파일을 넣어두면, / 로 접근했을때 목록을 보여준다
- [id] 로 접근하면, 해당하는 md 파일을 HTML 로 렌더링해서 보여준다
