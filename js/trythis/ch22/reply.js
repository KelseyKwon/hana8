/**
 * 1번 유저의 게시글 목록과 댓글을 리턴하는 getPosts 함수를 작성하시오.
 - 1번 유저의 글목록: https://jsonplaceholder.typicode.com/posts?userId=1 // async/ await -> 게시글 부분에 comments 부분을 심어줘야 한다. 
 - 댓글 목록: https://jsonplaceholder.typicode.com/posts/<postId>/comments // promise all 

getPosts(1);
[
  {
    postId: 게시글ID,
    title: 게시글 제목,
    comments: [댓글 목록]
  },
  { … }
]

 */

async function getPosts(userId) {
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  const posts = await postResponse.json();

  // 프로미스 객체 만들기
  const commentsPromises = posts.map(async (post) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
    );

    const comments = await res.json();

    return {
      postId: post.id,
      title: post.title,
      comments: comments,
    };
  });
  const result = await Promise.all(commentsPromises);

  return result;
}

getPosts(1).then(console.log);
