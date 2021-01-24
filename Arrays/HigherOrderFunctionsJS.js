const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2003 },
  { name: "Company Two", category: "Retail", start: 1982, end: 2004 },
  { name: "Company Three", category: "Auto", start: 1983, end: 2005 },
  { name: "Company Four", category: "Technology", start: 1984, end: 2006 },
  { name: "Company Five", category: "Insurance", start: 1985, end: 2007 },
  { name: "Company Six", category: "Computer", start: 1986, end: 2008 },
  { name: "Company Seven", category: "Aviation", start: 1987, end: 2009 },
  { name: "Company Eight", category: "Space", start: 1988, end: 2011 },
  { name: "Company Nine", category: "Railway", start: 1989, end: 2020 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

// for (let i = 0; i < companies.length; i++) {
  // console.log(companies[i]);
// }

//companies.forEach((company) => {
  //console.log(company);
//});

// Filter Get >= 21
//let canDrink = [];
//for (let i = 0; i < ages.length; i++) {
//  if (ages[i] >= 21) {
//    canDrink.push(ages[i]);
//  }
// }

// const canDrink = ages.filter((age) => {
  // if (age >= 21){
    // return true;
  //}
//});

const canDrink = ages.filter(age => age >= 21);

//const retailCompanies = companies.filter((item) => {
//  if (item.category === 'Retail') {
//    return true;
//  }
//});

const retailCompanies = companies.filter(company => company.category === 'Retail');
const companiesEighties = companies.filter(company => company.start >= 1980 && company.start <= 1989);
const companiesTenYears = companies.filter(company => (company.end - company.start >= 10));

// map
const companyNames = companies.map(company => `${company.name} [${company.start} - ${company.end}]`);
const agesSquare = ages.map(age => Math.sqrt(age));

// sort
//const sortedCompanies = companies.sort((item1, item2) => {
//  if (item1.start > item2.start) {
//    return 1;
//  } else {
//    return -1;
//  }
//});

const sortedCompanies = companies.sort((a, b) => (a.start > b.start ? 1 : -1)); //increasing by start date
const sortAges = ages.sort((a, b) => a - b); // increasing sorting

// reduce
//let ageSum = 0;
//for (let i = 0; i < ages.length; i++) {
//  ageSum += ages[i];
//}

const ageSum = ages.reduce((total, age) => total + age, 0);
const getAllYears = companies.reduce((total, company) => (total + (company.end - company.start)), 0);

// combine methods
const combined = ages
  .map(age => age * 2)
  .filter(age => age >= 40)
  .sort((a, b) => a - b)
  .reduce((total, item) => (total + item), 0);

const maxEndYear = Math.max(...companies.map(company => company.end));

console.log(maxEndYear);
