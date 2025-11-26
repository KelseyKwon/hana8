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

/**
async function getPosts(userId) {
// 비동기적으로 모든 데이터를 불러오고 json으로 할 때까지 await으로
// 걸어놔서 기다리게 한다!
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

  // commentPromises -> async이기 떄문에 Promise를 반환한다.
  // 따라서 all을 해서 안에 데이터를 실제로 반환해준다!
  const result = await Promise.all(commentsPromises);

  return result;
}

getPosts(1).then(console.log); co
*/

const API = "https://jsonplaceholder.typicode.com";
const getPostsByUserId = async (userId) =>
  fetch(`${API}/posts?userId=${userId}`).then((res) => res.json());
const getCommentsByUserId = async (postId) =>
  fetch(`${API}/posts/${postId}/comments`).then((res) => res.json());

async function fetchData() {
  const posts = await getPostsByUserId(1); // async이니까 promise가 됨 -> 이걸 벗길려면 await을 써야 함
  console.log("🚀 ~ posts:", posts);

  const postComments = await Promise.all(
    posts.map((post) => getCommentsByUserId(post.id))
  );

  const results = [];
  for (let i = 0; i < posts.length; i++) {
    const { id: postId, title } = postComments[i];
    const comments = comment[i].map(({ id, email, body }) => ({
      id,
      email,
      body,
    }));
    results.push = { postId, title, comments };
  }

  console.log("🚀 ~ results:", JSON.stringify(results, null, " "));
}

fetchData();
