import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().min(1,{
      message:"Email en az 1 karakter olmalıdır"
  }),
  password: z
  .string()
  .min(8, { message: 'En Az 8 Karakter Giriniz.' })
  .regex(/[a-zA-Z]/, { message: 'En az bi harf giriniz.' })
  .regex(/[0-9]/, { message: 'En Az Bir Sayı giriniz.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'En az bir özel karakter giriniz..',
  }),
  }) 
  
  export type RegisterFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

  export const LoginSchema = z.object({
    email: z.string().min(1,{
      message:"Email en az 1 karakter olmalıdır"
  }),
  password: z
  .string()
  .min(8, { message: 'En Az 8 Karakter Giriniz.' })
  .regex(/[a-zA-Z]/, { message: 'En az bi harf giriniz.' })
  .regex(/[0-9]/, { message: 'En Az Bir Sayı giriniz.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'En az bir özel karakter giriniz..',
  }),
   }) 

   export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
   
   export type FormState =
   | {
       errors?: {
         email?: string[];
         password?: string[];
       };
       message?: string;
     }
   | undefined;
export type LoginFormValues = z.infer<typeof RegisterSchema>
export type LoginFormValuess = z.infer<typeof LoginSchema>
