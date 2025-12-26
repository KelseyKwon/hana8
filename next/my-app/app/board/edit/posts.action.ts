'use server';
export const savePost = async (formData: FormData) => {
  // formData의 entries로 객체화 한다!
  console.log(Object.fromEntries(formData.entries()));
};
