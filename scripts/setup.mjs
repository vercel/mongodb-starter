import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

const main = async () => {
  try {
    await client.connect();

    const numUsers = await client
      .db('test')
      .collection('users')
      .countDocuments();

    if (numUsers) {
      console.log('Database already exists with data');
      client.close();
      return;
    }

    const records = [...Array(10)].map(() => {
      const [fName, lName] = faker.name.findName().split(' ');
      const username = faker.internet.userName(fName, lName);
      const email = faker.internet.email(fName, lName);
      const image = faker.image.people(640, 480, true);

      return {
        name: `${fName} ${lName}`,
        username,
        email,
        image,
        followers: 0,
        emailVerified: null
      };
    });

    const test = await client
      .db('test')
      .collection('users')
      .insertMany(records);

    if (test.acknowledged) {
      console.log('Successfully inserted records');
    }
  } finally {
    await client.close();
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
