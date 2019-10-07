/* eslint-disable no-undef */


var request = require('supertest');
var app = require('../../../index');
var mongoose = require('../../../database/config');
var assert = require('assert');
var config = require('../../../config/config');

/**
 * Testing get all user endpoint
 */
describe('[COMPANY]', function () {

	before(function (done) {
		mongoose.connect(config.TEST_DATABASE_URL, function () {
			mongoose.connection.db.dropDatabase(function () {
				done();
			});
		});
	});

	var createdCompanyId;
	var companyWorkspaceId;
	this.timeout(7000);
	it('it creates a company', function (done) {
		request(app)
			.post('/companies')
			.send({ displayName: 'Hope' })
			.set('Accept', 'application/json')
			.end(function (err, res) {
				createdCompanyId = res.body.payload._id;
				assert.equal(res.body.payload.name, 'hope');
				assert.equal(res.body.payload.displayName, 'Hope');
				done();
			});

	});

	it('try to create a duplicated company', function (done) {
		request(app)
			.post('/companies')
			.send({ displayName: 'Hope' })
			.set('Accept', 'application/json')
			.expect(400, done);
	});


	it('update company name', function (done) {
		request(app)
			.patch(`/companies/${createdCompanyId}`)
			.send({ displayName: 'Hope updated' })
			.set('Accept', 'application/json')
			.end(function (err, res) {
				assert.equal(res.body.payload.name, 'hope updated');
				assert.equal(res.body.payload.displayName, 'Hope updated');
				done();
			});
	});


	it('add company workspace', function (done) {
		request(app)
			.post(`/companies/${createdCompanyId}/workspaces`)
			.send({ displayName: 'Hope workspace' })
			.set('Accept', 'application/json')
			.end(function (err, res) {
				companyWorkspaceId = res.body.payload.workspaces[0]._id;
				assert.equal(res.body.payload.workspaces.length, 1);
				done();
			});
	});

	it('update company workspace', function (done) {
		request(app)
			.patch(`/companies/${createdCompanyId}/workspaces/${companyWorkspaceId}`)
			.send({ displayName: 'Hope workspace updated' })
			.set('Accept', 'application/json')
			.end(function (err, res) {
				assert.equal(res.body.payload.workspaces.length, 1);
				assert.equal(res.body.payload.workspaces[0].displayName, 'Hope workspace updated');
				assert.equal(res.body.payload.workspaces[0]._id, companyWorkspaceId);
				done();
			});
	});

	it('add user to workspace', function (done) {
		request(app)
			.post(`/companies/${createdCompanyId}/workspaces/${companyWorkspaceId}/users`)
			.send({ email: 'test@test.com', role: 'admin' })
			.set('Accept', 'application/json')
			.end(function (err, res) {
				assert.equal(res.body.payload.workspaces.length, 1);
				assert.equal(res.body.payload.workspaces[0].displayName, 'Hope workspace updated');
				assert.equal(res.body.payload.workspaces[0]._id, companyWorkspaceId);
				assert.equal(res.body.payload.workspaces[0].users.length, 1);
				assert.equal(res.body.payload.workspaces[0].users[0].email, 'test@test.com');
				assert.equal(res.body.payload.workspaces[0].users[0].role, 'admin');
				done();
			});
	});


	it('add user to workspace with wrong role', function (done) {
		request(app)
			.post(`/companies/${createdCompanyId}/workspaces/${companyWorkspaceId}/users`)
			.send({ email: 'test@test.com', role: 'ese' })
			.set('Accept', 'application/json')
			.expect(400, done);
	});

	it('delete user from workspace', function (done) {
		request(app)
			.delete(`/companies/${createdCompanyId}/workspaces/${companyWorkspaceId}/users/test@test.com`)
			.set('Accept', 'application/json')
			.expect(200, done);
	});



	it('add user to workspace with role basic', function (done) {
		request(app)
			.post(`/companies/${createdCompanyId}/workspaces/${companyWorkspaceId}/users`)
			.send({ email: 'test@test.com', role: 'basic' })
			.set('Accept', 'application/json')
			.end(function (err, res) {
				assert.equal(res.body.payload.workspaces.length, 1);
				assert.equal(res.body.payload.workspaces[0].displayName, 'Hope workspace updated');
				assert.equal(res.body.payload.workspaces[0]._id, companyWorkspaceId);
				assert.equal(res.body.payload.workspaces[0].users.length, 1);
				assert.equal(res.body.payload.workspaces[0].users[0].email, 'test@test.com');
				assert.equal(res.body.payload.workspaces[0].users[0].role, 'basic');
				done();
			});
	});

});