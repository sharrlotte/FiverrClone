import { z } from "zod";
import api from "../api/api";

const passwordStrength = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

export const registerSchema = z.object({
    email: z
        .string()
        .min(4, {
            message: 'Tên tài khoản phải nhiều hơn 4 kí tự',
        })
        .max(100, { message: 'Tên tài khoản phải ít hơn 100 kí tự' })
        .refine(email => email.endsWith('@gmail.com'), {
            message: 'Email không hợp lệ. Email phải có đuôi @gmail.com',
        }),

    password: z
        .string()
        .min(8, {
            message: 'Mật khẩu phải nhiều hơn 8 kí tự',
        })
        .max(100, { message: 'Mật khẩu phải ít hơn 100 kí tự' })
        .refine(passwordStrength, {
            message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
        }),

    confirmPassword: z
        .string()
        .min(8, {
            message: 'Mật khẩu phải nhiều hơn 8 kí tự',
        })
        .max(100, { message: 'Mật khẩu phải ít hơn 100 kí tự' })
        .refine(passwordStrength, {
            message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
        }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu phải trùng khớp",
    path: ["confirmPassword"],
});

export type RegisterRequest = z.infer<typeof registerSchema>;

export async function registerRequest(request: RegisterRequest) {
    return api.post('/login', request, {
        data: request,
    });
}
