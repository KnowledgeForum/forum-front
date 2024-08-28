export const validationEmail = (email: string) => {
  if (email.trim() === "") return false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;

  return true;
};

export const validationPassword = (password: string) => {
  if (password.trim() === "") return false;

  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-=`{}[\]:";'<>?,./])[A-Za-z\d!@#$%^&*()_+~\-=`{}[\]:";'<>?,./]{8,20}$/;
  if (!passwordRegex.test(password)) return false;

  return true;
};
