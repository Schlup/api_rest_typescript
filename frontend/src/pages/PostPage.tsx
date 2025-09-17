import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostSection from "../components/PostSection";
import type { PostData } from "../types";
import { initialData } from "../data/mockData";

const PostPage: React.FC = () => {
  const [postData, setPostData] = useState<PostData>({ subject_id: 2 });
  const navigate = useNavigate();

  const handlePostSubmit = (): void => {
    console.log("POST Request:", postData);

    const foundItem = initialData.find((item) =>
      item.subjects.some((subject) => subject.id === postData.subject_id)
    );

    if (foundItem) {
      navigate(`/item/${foundItem.id}`);
    } else {
      console.error(
        "Nenhum item encontrado para o subject_id:",
        postData.subject_id
      );
    }
  };

  return (
    <PostSection
      postData={postData}
      onPostDataChange={setPostData}
      onPostSubmit={handlePostSubmit}
    />
  );
};

export default PostPage;
