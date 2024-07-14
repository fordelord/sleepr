describe('Reservations', () => {
  let jwt: string;

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

    const cookie = response.headers.get('set-cookie');
    jwt = cookie.split('=', 2)?.[1].split(';')?.[0];
  });

  test('Create & Get', async () => {
    const reservation = {
      startDate: '02-01-2024',
      endDate: '02-03-2024',
      placeId: '134',
      invoiceId: '134',
      charge: {
        amount: 125,
        card: {
          cvc: '413',
          exp_month: 12,
          exp_year: 2027,
          number: '4242 4242 4242 4242',
        },
      },
    };
    const responseCreate = await fetch(
      'http://reservations:3001/reservations',
      {
        method: 'POST',
        body: JSON.stringify(reservation),
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
      },
    );

    expect(responseCreate.ok).toBeTruthy();

    const createdReservation = await responseCreate.json();

    const responseGet = await fetch(
      `http://reservations:3001/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );
    const resultGet = await responseGet.json();
    expect(createdReservation).toEqual(resultGet);
  });
});
