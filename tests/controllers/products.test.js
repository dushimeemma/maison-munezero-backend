import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../src';

chai.use(chaiHttp);
chai.should();

let token;
let id;
let testProduct = {
  title: 'Suits',
  description: 'made in Rwanda',
  category: 'Men',
  gender: 'Male',
  price: 100,
  image:
    'https://firebasestorage.googleapis.com/v0/b/maison-munezero.appspot.com/o/men-one.jpeg?alt=media&token=3faf18e9-60dd-4c43-a809-20f002fcdc50',
};

describe('Product', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test@email.com', password: 'Test@Password^1' });
    token = response.body.data['token'];
  });
  it('Should create new product', (done) => {
    chai
      .request(app)
      .post('/api/products/create')
      .send(testProduct)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should create new product when image is not provided', (done) => {
    chai
      .request(app)
      .post('/api/products/create')
      .send({
        title: testProduct.title,
        description: testProduct.description,
        category: testProduct.category,
        gender: testProduct.gender,
        price: testProduct.price,
      })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should get all product', (done) => {
    chai
      .request(app)
      .get('/api/products')
      .end((err, res) => {
        if (err) done(err);
        id = res.body.data['products'][0].id;
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should get single product', (done) => {
    chai
      .request(app)
      .get(`/api/products/${id}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should not get single product when not found', (done) => {
    chai
      .request(app)
      .get(`/api/products/100`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.should.be.a('Object');
        done();
      });
  });

  it('Should update a product', (done) => {
    chai
      .request(app)
      .put(`/api/products/update/${id}`)
      .send(testProduct)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should not update a product when field is empty', (done) => {
    chai
      .request(app)
      .put(`/api/products/update/${id}`)
      .send({ title: '' })
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should not update a product when not found', (done) => {
    chai
      .request(app)
      .put(`/api/products/update/100`)
      .send(testProduct)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should delete a product', (done) => {
    chai
      .request(app)
      .delete(`/api/products/delete/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should not delete a product when not found', (done) => {
    chai
      .request(app)
      .delete(`/api/products/delete/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.should.be.a('Object');
        done();
      });
  });
});
