const {app} = require('../server');
// const {route} = require('../routes/userRoutes');
const UserModel = require('../models/UserModel');
// var chai = require('chai')
//   , chaiHttp = require('chai-http');
   
const expect = require('expect');
const request = require('supertest');


describe('POST /user/signup', () => {
    it('should create a user', () => {
      var email = "explrdgsgcfdfge@email.com";
      var password = "12345678!";
      var nickname = "nickname";
  
      request(app)
        .post('/user/signup')
        .send({"nickname":nickname, "mail":email, "password":password})
        .expect((res) => {
          console.log(res.body.mail);
          expect(res.headers['Authorization']).not.toBeNull();
          expect(res.body._id).not.toBeNull();
          expect(res.body.mail).toBe(email);
        })
        .end((err) => {
          if(err) return done(err);
  
          UserModel.findOne({"mail":email}).then((user) => {
            expect(user).not.toBeNull();
            expect(user.password).not.toBe(password);
            // done();
          });
        });
    });
});