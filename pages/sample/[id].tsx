import { useRouter } from "next/router";
import React from "react";

const Post = () => {
  const router = useRouter();
  const routeId = router.query.id;
  console.log(routeId);

  return (
    <>
      <p>aaaa</p>
    </>
  );
};

export default Post;
