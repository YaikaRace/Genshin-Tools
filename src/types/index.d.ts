export interface UserInfo {
  _id: string;
  email: string;
  role: "user" | "mod" | "admin";
  username: string;
}
