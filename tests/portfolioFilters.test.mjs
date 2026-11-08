import test from 'node:test';
import assert from 'node:assert/strict';
import { filterPortfolioProjects } from '../src/lib/portfolioFilters.js';

const projects = [
  { companyName: 'Parker Hannifin', images: ['parker-first', 'parker-second'] },
  { companyName: 'Alphabet Capital', images: ['alphabet-first'] },
  { companyName: "Taylor's College", images: ['taylors-first'] }
];

test('All projects preserves existing project and gallery order', () => {
  assert.deepEqual(filterPortfolioProjects(projects), projects);
});

test('client selection matches the displayed company rather than its image source folder', () => {
  assert.deepEqual(filterPortfolioProjects(projects, 'Parker Hannifin'), [projects[0]]);
  assert.deepEqual(filterPortfolioProjects(projects, 'Alphabet Capital'), [projects[1]]);
});

test('client search ignores case and surrounding whitespace and combines with selection', () => {
  assert.deepEqual(filterPortfolioProjects(projects, '', '  COLLEGE  '), [projects[2]]);
  assert.deepEqual(filterPortfolioProjects(projects, 'Parker Hannifin', 'alphabet'), []);
});

test('unmatched searches and missing selections return an empty result', () => {
  assert.deepEqual(filterPortfolioProjects(projects, '', 'not a client'), []);
  assert.deepEqual(filterPortfolioProjects(projects, 'Missing client'), []);
  assert.deepEqual(filterPortfolioProjects([], '', ''), []);
});
