const express = require('express');
const User = require('../model/user');

const user = new User({ id: '', password: '', role: 'not logged in', courses: [] });
let currentUser = '';
module.exports = {
  resetCurrentUser: () => {
    return (req, res, next) =>{
      currentUser = user;
      next();
    }
  },
  getCurrentUser: () => {return currentUser},
  setCurrentUser: (value) => {
    currentUser = value;
  }
};