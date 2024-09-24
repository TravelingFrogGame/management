/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};

  const ong = {
    canAdmin: currentUser && currentUser.access === 'admin',
  };

  if (currentUser && currentUser.menu) {
    currentUser.menu.split(',').forEach((role) => {
      ong[role] = true;
    });
  }

  console.log(ong)
  return ong
}
