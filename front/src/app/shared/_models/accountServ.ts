export interface RegisterModel {
   nombre: string;
   email: string;
   password: string;
   confirmPassword: string;
}

export interface LoginModel {
   email: string;
   password: string;
}
