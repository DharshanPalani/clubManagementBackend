const me = (request, response) => {
  return response.json({ user: request.user, isAuth: true });
};
export default me;
