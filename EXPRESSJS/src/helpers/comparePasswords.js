import { compare } from "bcrypt";

export const comparePasswords = async (clearPwd, hashedPwd) => {
  let pwdMatches = false;

  console.log("clearPwd: ", clearPwd, "hashedPwd: ", hashedPwd);

  try {
    pwdMatches = await compare(clearPwd, hashedPwd);
    console.log("password comparison done: ", pwdMatches);
  } catch (error) {
    console.error(error);
  }
  console.log("About to return following pwdMatches value: ", pwdMatches);
  return pwdMatches;
};
