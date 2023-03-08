const SELECT = `
  SELECT id, name, surname, email, password, role, photo, isMarried
  FROM users
`;

const SQL = {
  SELECT,
};

export default SQL;
