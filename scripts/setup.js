require('dotenv').config();

const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

const client = new MongoClient(process.env.DATABASE_URL);

const main = async () => {
	try {
		await client.connect();
		await client.db('test').command({ ping: 1 });
		const records = [...Array(10)].map(() => {
			const [fName, lName] = faker.name.findName().split(' ');
			const username = faker.internet.userName(fName, lName);
			const email = faker.internet.email(fName, lName);
			const image = faker.image.people();

			return {
				name: `${fName} ${lName}`,
				username,
				email,
				image,
				followers: 0,
				emailVerified: null,
			};
		});

		const test = await client.db('test').collection('users').insertMany(records);

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
