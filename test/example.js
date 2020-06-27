const supertest = require('supertest'),
api = supertest('http://yourapi.url');
var chai = require('chai')
  , chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.use(require('chai-json-schema'));
const should = require('should');


describe('Example', () => {

	it ('Verify 200 status for POST', function(done){
		api
		.post('/')
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.send({key1: 'value1', key2: 'value2'})
		.expect(200, done);
	});

	it ("Verify 200 status for GET", function(done) {
        api
        .get('/api/mylink')
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .expect(200, done)
    });

	it ('Verify JSON Schema Validation - type and actual values', function(done){
		api
		.post('/')
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.send({key1: 'value1', key2: 'value2'})
		.expect(function(res) {
		//Verify type of values for needed keys in response
		chai.assert.jsonSchema(res.body.name, {"type": 'string'})
		chai.assert.jsonSchema(res.body.lastName, {"type": 'number'})
		chai.assert.jsonSchema(res.body.date, {"type": 'boolean'})
		chai.assert.jsonSchema(res.body[".issued"], {"type": 'string'})
		//Verify exact value for particular key in response
		res.body.error.should.equal("Name is required")
		should(res.body.data).have.key("designation")
		//In case of usual equal does not work - you can use deep equal that will check special characters as well
		res.body.errors.should.deepEqual([
			"One Two [] Three"
		])
		})
		.expect(200, done);
	})
});