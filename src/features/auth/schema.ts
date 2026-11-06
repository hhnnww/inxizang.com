import { z } from "zod";

export const createAdminUserSchema = z.object({
	email: z.email("请输入有效的邮箱地址"),
	name: z.string().min(1, "名称不能为空"),
	password: z.string().min(8, "密码至少需要 8 个字符").optional(),
	role: z.string().min(1).optional(),
});

export type CreateAdminUserInput = z.infer<typeof createAdminUserSchema>;
