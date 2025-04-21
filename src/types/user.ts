import zod from "zod";

export const registerSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

export type registerSchema = zod.infer<typeof registerSchema>;

export const loginSchema = zod.object({
  id: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
  createdAt: zod.date(),
});

export type loginSchema = zod.infer<typeof loginSchema>;

export const recruiterSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
  role: zod.enum(["employee", "recruiter"]),
});
