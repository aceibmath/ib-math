// src/data/questionbank/aa-sl/index.js
import sequences_and_series from "./sequences-and-series/index.js";
import exponents_and_logarithms from "./exponents-and-logarithms";
import binomial_theorem from "./binomial-theorem";
import proofs from "./proofs";

import introducing_functions from "./introducing-functions";
import quadratic_equations_and_functions from "./quadratic-equations-and-functions";
import rational_functions from "./rational-functions";
import exponential_and_logarithmic_functions from "./exponential-and-logarithmic-functions";
import transformations_of_functions from "./transformations-of-functions";

import geometry_trigonometry_in_2d_and_3d from "./geometry-trigonometry-in-2d-and-3d";
import trigonometric_functions from "./trigonometric-functions";

import univariate_statistics from "./univariate-statistics";
import bivariate_statistics from "./bivariate-statistics";
import probability from "./probability";
import distributions from "./distributions";

import differentiation from "./differentiation";
import integration from "./integration";
import kinematics from "./kinematics";

const DATA = [
  ...sequences_and_series,
  ...exponents_and_logarithms,
  ...binomial_theorem,
  ...proofs,

  ...introducing_functions,
  ...quadratic_equations_and_functions,
  ...rational_functions,
  ...exponential_and_logarithmic_functions,
  ...transformations_of_functions,

  ...geometry_trigonometry_in_2d_and_3d,
  ...trigonometric_functions,

  ...univariate_statistics,
  ...bivariate_statistics,
  ...probability,
  ...distributions,

  ...differentiation,
  ...integration,
  ...kinematics,
];

export default DATA;
