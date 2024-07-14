import { ping } from 'tcp-ping';

describe('Health', () => {
  test('Reservations', async () => {
    const response = await fetch('http://reservations:3001');
    expect(response.ok).toBeTruthy();
  });

  test('Auth', async () => {
    const response = await fetch('http://auth:3002');
    expect(response.ok).toBeTruthy();
  });

  test('Payments', (done) => {
    ping({ address: 'payments', port: 3004 }, (error) => {
      if (error) {
        fail();
      }
      done();
    });
  });

  test('Notifications', (done) => {
    ping({ address: 'notifications', port: 3005 }, (error) => {
      if (error) {
        fail();
      }
      done();
    });
  });
});
