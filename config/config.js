module.exports = {
	NAME_OF_CONFIG: process.env.NAME_OF_CONFIG || 'default-config',
	DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/Business',
	TEST_DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/Business-test',
	PORT: process.env.PORT || 3000,
};