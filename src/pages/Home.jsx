import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { StButton, ButtonWrap } from '../components/Button';
import { getDocs, collection, addDoc, query, setDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [post, setPost] = useState([
    {
      id: 0,
      image: 'url?',
      contents: '내용입니다',
    },
    {
      id: 1,
      image: 'url?',
      contents: '내용입니다',
    },
  ]);
  // 데이터 리스트로 불러오기
  useEffect(() => {
    const initialPostItem = [];
    const fetchData = async () => {
      const queryValue = query(collection(db, 'post-item'));
      const querySnapshot = await getDocs(queryValue);

      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        console.log('data =>', data);
        console.log('post =>', post);
        initialPostItem.push(data);
      });
      setPost(initialPostItem);
    };
    fetchData();
  }, []);

  // const { sucessUserInfo } = useSelector(state => state.userLogIn);
  const [contents, setContents] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const selectFile = event => setSelectedFile(event.target.files[0]);
  const contentsOnchange = event => setContents(event.target.value);

  const addPostHandler = async event => {
    event.preventDefault();

    try {
      const storageRef = ref(storage, auth.currentUser.uid);
      const uploadPost = uploadBytesResumable(storageRef, selectedFile);

      uploadPost.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadPost.snapshot.ref).then(async downloadURL => {
            const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
            await uploadBytes(imageRef, selectedFile);

            const collectionRef = collection(db, 'post-item');
            await addDoc(collectionRef, {
              uid: auth.currentUser.uid,
              contents,
              photoURL: downloadURL,
            });
          });
        },
      );
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* 상단 게시글 등록 버튼  */}
      <div>
        <Navigation />
        <Banner>
          <div>
            <h1>Title banner here</h1>
          </div>
          <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </div>
          <button onClick={openModal}>글작성하기 일단여기 넣어둠요 ㅎㅎ</button>
        </Banner>
        <StCardContainer>
          {post.map(item => {
            return (
              <StCard key={item.id}>
                <StImg src={item.photoURL} />
                <StId>{item.id}</StId>
                <StContent>{item.contents}</StContent>
              </StCard>
            );
          })}
        </StCardContainer>
        <Footer />
      </div>

      {/* modal */}
      <div>
        {isOpen && (
          <ModalBg onClick={closeModal}>
            <ModalContents
              onClick={event => {
                event.stopPropagation();
              }}
            >
              {/* 수정페이지에서 보여줘야함 */}
              {/* <ButtonWrap style={{ float: 'right' }}>
              <StButton acColor={'#39ddc2'}>수정</StButton>
              <StButton acColor={'#39ddc2'}>삭제</StButton>
            </ButtonWrap> */}

              {/* 모달 닫기 버튼 */}
              <StModalCloseButton onClick={closeModal}>
                <StSvg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </StSvg>
              </StModalCloseButton>

              <form onSubmit={addPostHandler} style={{ clear: 'both', overflow: 'hidden' }}>
                <Label>사진 첨부 </Label>
                <Input type="file" onChange={selectFile} />
                <Label>내용</Label>
                <InputArea value={contents} onChange={contentsOnchange} />
                <StButton type="submit" style={{ float: 'right' }}>
                  등록
                </StButton>
              </form>
            </ModalContents>
          </ModalBg>
        )}
      </div>
    </>
  );
};
export default Home;

// banner
const Banner = styled.div`
  width: 100vw;
  height: 600px;
  background-color: #f4f5f9;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & > div {
    width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// list style
const StCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1300px;
  min-width: 800px;
  margin: 0 auto;
  padding-top: 50px;
`;
const StCard = styled.div`
  border: none;
  width: 300px;
  height: 500px;
  cursor: pointer;
`;
const StImg = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;
const StId = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
`;
const StContent = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 15px;
`;

// modal
const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
`;
const ModalContents = styled.div`
  width: 60%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5%;
`;
// 모달 닫기 컴포넌트
const StModalCloseButton = styled.button`
  background-color: transparent;
  font-size: 38px;
  position: absolute;
  top: 6px;
  right: 0px;
`;
const StSvg = styled.svg`
  fill: #7c7c7c;
  transition: scale 0.3s;
  &:hover {
    fill: #000;
    scale: 1.2;
  }
`;
const Label = styled.label`
  width: 100%;
  display: block;
  line-height: 35px;
`;
const Input = styled.input`
  width: 100%;
  border: 0;
  border: solid 1px #ddd;
  padding: 10px;
  border-radius: 5px;
`;
const InputArea = styled.textarea`
  width: 100%;
  height: 300px;
  border: 0;
  border: solid 1px #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 25px;
`;
