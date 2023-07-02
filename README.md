## [매일리룩](https://nbc-maeily.vercel.app/)

매일 데일리 룩을 올려 공유하고 저장하여 자신만의 룩북을 완성할 수 있는 웹앱 서비스입니다.

---

## 팀구성

|                                                김유진                                                |                                                전수정                                                 |                                                김진수                                                |                                                유희정                                                 |
| :--------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/129598273?v=4" alt="프로필 이미지" width="200px"/> | <img src="https://avatars.githubusercontent.com/u/133937368?v=4" alt="프로필 이미지" width="200px" /> | <img src="https://avatars.githubusercontent.com/u/78424449?v=4" alt="프로필 이미지" width="200px" /> | <img src="https://avatars.githubusercontent.com/u/126348461?v=4" alt="프로필 이미지" width="200px" /> |
|                                             `Front-end`                                              |                                              `Front-end`                                              |                                             `Front-end`                                              |                                              `Front-end`                                              |

---

## How To Use

```
# clone this repository
$ git clone git@github.com:nbc-react-1/nbc-maeily.git

# into the repository
$ cd nbc-maeily

# install dependencies
$ yarn install

# run
$ yarn start
```

---

## 프로젝트 구조

📦src
┣ 📂components 👉 공통 컴포넌트<br>
┃ ┣ 📜Button.jsx<br>
┃ ┣ 📜Footer.jsx<br>
┃ ┣ 📜Layout.jsx<br>
┃ ┣ 📜Like.jsx<br>
┃ ┣ 📜Modal.jsx<br>
┃ ┗ 📜Navigation.jsx<br>
┃ ┣ 📂detail 👉 상세 페이지에서 사용되는 컴포넌트<br>
┃ ┃ ┗ 📜CmtInputForm.jsx 👉 댓글 입력<br>
┃ ┣ 📂home 👉 메인 페이지에서 사용되는 컴포넌트<br>
┃ ┃ ┣ 📜Banner.jsx 👉 배너<br>
┃ ┃ ┗ 📜PostList.jsx 👉 게시글 불러오기<br>
┃ ┣ 📂modal 👉 사용되는 모달<br>
┃ ┃ ┣ 📜CreatePostModal.jsx 👉 게시글 작성<br>
┃ ┃ ┣ 📜EditPostModal.jsx 👉 게시글 수정<br>
┃ ┃ ┗ 📜JoinUserModal.jsx 👉 회원가입<br>
┃ ┣ 📂mypage 👉 마이 페이지에서 사용되는 컴포넌트<br>
┃ ┃ ┣ 📜MyInfo.jsx 👉 회원정보 불러오기, 수정 및 탈퇴<br>
┃ ┃ ┗ 📜MyPosts.jsx 👉 내가 쓴 게시글 불러오기, 수정 및 탈퇴<br>
┣ 📂pages<br>
┃ ┣ 📜Detail.jsx<br>
┃ ┣ 📜Home.jsx<br>
┃ ┣ 📜Login.jsx<br>
┃ ┗ 📜Mypage.jsx<br>
┣ 📂redux<br>
┃ ┣ 📂config<br>
┃ ┃ ┗ 📜configStore.js<br>
┃ ┗ 📂modules<br>
┃ ┃ ┗ 📜userLogIn.js<br>

---

## 커밋 컨벤션

- Feat : 새로운 기능 추가
- Fix : 버그 수정
- Docs : 문서 변경
- Style : 코드 포맷팅 등 스타일 관련 변경
- Refactor : 코드 리팩토링
- Chore : 설정 변경 등의 기타 변경사항
- Design : CSS 등 사용자 UI 디자인 변경
- Rename : 파일 또는 폴더 명을 수정하거나 옮기는 작업
- Resolve: 병합시 충돌 해결
