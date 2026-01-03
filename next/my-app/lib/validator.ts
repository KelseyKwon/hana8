/** biome-ignore-all lint/style/useNodejsImportProtocol: 'edge runtime' */
import { compare, hash } from 'bcryptjs';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
// import { writeFile } from 'fs/promises';
import path from 'path';
import z from 'zod';

export type ValidError = {
  error: Record<string, string | undefined>;
  data: Record<string, string | undefined | null>;
};

// form 데이터를 받아서 Zod 스키마로 검증 -> 성공 / 실패를 튜플 형태로 변환
export const validate = <T extends z.ZodObject>(
  zobj: T,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData.entries()) as ValidError['data'];
  // $이 추가되면 없앤다?
  for (const k of Object.keys(data)) {
    if (k.startsWith('$')) delete data[k];
  }
  const validator = zobj.safeParse(data);
  if (!validator.success) {
    const verr = z.treeifyError(validator.error).properties || {};
    const validError: ValidError = { error: {}, data };
    for (const [k, v] of Object.entries(verr)) {
      validError.error[k] = v?.errors[0];
    }
    return [validError] as const;
  }

  return [undefined, validator.data] as const;
};

export const validateAsync = async <T extends z.ZodObject>(
  zobj: T,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData.entries()) as ValidError['data'];
  for (const k of Object.keys(data)) {
    if (k.startsWith('$')) delete data[k];
  }
  const validator = await zobj.safeParseAsync(data);
  if (!validator.success) {
    const verr = z.treeifyError(validator.error).properties || {};
    const validError: ValidError = { error: {}, data };
    for (const [k, v] of Object.entries(verr)) {
      validError.error[k] = v?.errors[0];
    }
    return [validError] as const;
  }

  return [undefined, validator.data] as const;
};

// ===== 프로필 파일 저징 ===== //
export const saveProfile = async (file: File) => {
  if (file && file.size > 0) {
    const fileName = `${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public/profile');
    if (!existsSync(uploadDir)) mkdirSync(uploadDir);
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    writeFileSync(filePath, buffer);
    return `/profile/${fileName}`;
  }
};

export const encryptPassword = async (plainPasswd: string) =>
  hash(plainPasswd, 10);

export const comparePassword = async (
  plainPasswd: string,
  encPassword: string,
) => compare(plainPasswd, encPassword);
