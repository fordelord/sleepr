describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'dabashin140504@gmail.com',
      password: '!StrongPassword123',
    };

    await fetch('http://auth:3002', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  });

  test('Create', () => {
    console.log();
  });
});
