import Auth from './Auth';

describe('Auth test', () => {

  let auth = new Auth({superuser: "superpassword"});

  it('Logins when user and password matches', () => {
    expect(auth.login('superuser', 'superpassword')).toBe(true);
  });

  it('Does not login when there password does not mach user', () => {
    expect(auth.login('superuser', 'weakpassword')).toBe(false);
  });

});