export interface UserLoginParam {
  username: string;
  password: string;
  factory: string;
}

export interface UserForLogged {
  id: string;
  name: string;
  email: string;
  username: string;
  roles: RoleInfomation[];
  roleAll: RoleInfomation[]
}

// export interface RoleInfomation {
//   name: string;
//   unique: string;
//   position: number | null;
// }
export interface RoleInfomation {
  program_Name: string;
  program_Code: string;
}
