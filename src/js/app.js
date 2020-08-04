'use strict';

let humansArr = [
    new Human(4, 'Bob', 12000, '+38 050 452 09 08'),
    new Human(5, 'Nelson', 60300, '+38 093 600 60 60'),
    new Human(6, 'Whitney', 342000, '+38 096 792 54 56')
]

let companiesArr = [
    new Company(1, 'ABC', 1000000, '+38 048 765 32 94', 100),
    new Company(2, 'Pharma', 50000, '+38 048 700 32 32', 23),
    new Company(3, 'STO', 1000, '+38 048 648 66 66', 6),
];

let autoArr = [
    new Auto(7, 'Tesla', 2019, 60000),
    new Auto(8, 'Nissan', 2015, 23000),
    new Auto(9, 'Lada', 2007, 4000),
];

humansArr = createLocalStorage('human storage', humansArr);
companiesArr = createLocalStorage('company storage', companiesArr);
autoArr = createLocalStorage('auto storage', autoArr);



createShowButtons();
createBaseTable();
addListenerToInfoButton();
