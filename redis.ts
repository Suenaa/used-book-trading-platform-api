import * as redis from 'redis';

const db = redis.createClient();

db.multi().hmset('clients:client', {
  clientId: 'client',
  clientSecret: 'secret'
}).exec((errs) => {
  if (errs) {
    console.error(errs.message);

    return process.exit(1);
  }

  console.log('Client and user added successfully');
  process.exit();
});
