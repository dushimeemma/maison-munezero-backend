import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../src';

chai.use(chaiHttp);
chai.should();

let user = {
  name: 'Test User',
  email: 'test@email.com',
  password: 'Test@Password^1',
};

describe('Auth', () => {
  it('Should register new user', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        res.should.be.a('Object');
        res.should.have.status(200);
        done();
      });
  });
  it('Should not register new user when email exists', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        res.should.be.a('Object');
        res.should.have.status(400);
        done();
      });
  });
  it('Should not register new user when email not provided', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({ name: user.name, password: user.password })
      .end((err, res) => {
        if (err) done(err);
        res.should.be.a('Object');
        res.should.have.status(400);
        done();
      });
  });
  it('Should login user', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .end((err, res) => {
        if (err) done(err);
        res.should.be.a('Object');
        res.should.have.status(200);
        done();
      });
  });
  it('Should not login when password is invalid', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: 'Dummy@Password^1' })
      .end((err, res) => {
        if (err) done(err);
        res.should.be.a('Object');
        res.should.have.status(401);
        done();
      });
  });
  it('Should not login when password is not provided', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: user.email })
      .end((err, res) => {
        if (err) done(err);
        res.should.be.a('Object');
        res.should.have.status(400);
        done();
      });
  });
});
