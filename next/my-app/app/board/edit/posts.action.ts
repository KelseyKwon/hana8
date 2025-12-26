'use server';
export type Post = {
  title: string;
  content: string;
  isprivate: boolean;
};
export type PostError = {
  error: string;
};
// type : error거나, Post인거.
export const savePost = async (
  formData: FormData,
  // error가 있거나, error가 없으면, Post도
): Promise<[PostError] | [undefined, Post]> => {
  // formData의 entries로 객체화 한다!
  console.log(Object.fromEntries(formData.entries()));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const title = formData.get('title') as string;
  const isprivate = formData.get('private') === 'on';
  const content = formData.get('content') as string;

  if (!title) return [{ error: 'Input the title!' }];

  return [undefined, { title, content, isprivate }];
};
