var express = require('express');
var userModel = require('../model/utilisateur')
var offreModel = require('../model/offre_emploi')
var candidatureModel = require('../model/candidature')
var organisationModel = require('../model/organisation')
var router = express.Router();