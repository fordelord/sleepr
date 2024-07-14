describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'dabashin140504@gmail.com',
      password: '!StrongPassword123',
    };

    await fetch('http://auth:3002/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await fetch('http://auth:3002/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jwt = await response.text();
    console.log('jwt', jwt);
  });

  test('Create', () => {
    expect(true).toBeTruthy();
  });
});
