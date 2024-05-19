import JWT from "jsonwebtoken";

const getToken = (id: string) => {
  const token = JWT.sign({ id }, process.env.JWT_KEY);
  return token;
};
const verifyToken = (token: string) => {
  const payload = JWT.verify(token, process.env.JWT_KEY);
  return payload;
};

export { getToken, verifyToken };
