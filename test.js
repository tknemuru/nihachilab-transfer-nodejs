var request = require('supertest')
var app = require('./server');

describe('My API tests', function () {   
    it('POSTでbodyのJSON情報が取得できる', function () {
        request(app)
        .post('/')
        .send({ title: 'test title' })
        .end(function (res) {
            expect(res).to.exist;
            expect(res.status).to.equal(200);
        })
    });
});