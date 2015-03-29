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

    it('通過チェックが行える', function () {
        request(app)
        .get('/agreement_register/')
        .end(function (res) {
            expect(res).to.exist;
            expect(res.status).to.equal(200);
        })
    });
});