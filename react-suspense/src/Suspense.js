import React, { Suspense } from "react";
import { fetchData } from "./wrapPromise";

const resource = fetchData();
const SamplePage = () => {
  return (
    <Suspense fallback={<h1>Loading Title...</h1>}>
      <TitleDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <PostDetails />
      </Suspense>
    </Suspense>
  );
};

export default SamplePage;

const TitleDetails = () => {
  return <h1>Sample Page for Suspense-practice</h1>;
};

const PostDetails = () => {
  // 비록 아직 불러오기가 완료되지 않았겠지만, 이미지 읽기를 시도합니다!
  // 아래 코드 위치 중요!
  const example = resource.read();
  return (
    <ul>
      {example.map((post, id) => (
        <li key={id}>
          <img src={post.url}></img>
        </li>
      ))}
    </ul>
  );
};
