const express = require('express')

let currentUser = 'null';

module.exports = {
  getCurrentUser: () => currentUser,
  setCurrentUser: (value) => {
    currentUser = value;
  }
};