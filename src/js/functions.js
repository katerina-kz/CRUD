'use strict';

//localStorage


function createLocalStorage(storageName, arr) {
    if (localStorage.getItem(storageName)) {
        arr = JSON.parse(localStorage.getItem(storageName)); 
    } else {
        localStorage.setItem(storageName, JSON.stringify(arr)); 
    }

    return arr;
}

function setData(array, storageName) {
    let data = JSON.stringify(array);
    localStorage.setItem(storageName, data); 
}

function getData(array, storageName) { 
    let data = JSON.stringify(array);
    localStorage.getItem(storageName, data);
}


function updateStorageData() {
    setData(humansArr, 'human storage');
    setData(companiesArr, 'company storage');
    setData(autoArr, 'auto storage');
    getData(humansArr, 'human storage');
    getData(companiesArr, 'company storage');
    getData(autoArr, 'auto storage');
}
// -----------------------------------------------------------------------   

// $('.wrapper').append('<div class="buttons-box"></div>');
// $('.button-box').append(
//     `<button type="button" class="btn btn-outline-danger human">Human</button>
//     <button type="button" class="btn btn-outline-warning company">Company</button>
//     <button type="button" class="btn btn-outline-success auto">Auto</button>`);

function createShowButtons() {
    let parent = document.querySelector('.wrapper');
    parent.innerHTML += 
    `
    <div class="buttons-box">
        <button type="button" class="btn btn-outline-danger human">Human</button>
        <button type="button" class="btn btn-outline-warning company">Company</button>
        <button type="button" class="btn btn-outline-success auto">Auto</button>
    </div>
    `;
}

function createTable(divContent) {
    let parent = document.querySelector('.caption');
    parent.innerHTML += 
    `<div class="caption-name">
        <span>${divContent}</span>
    </div>
    <div class="caption-action">
        <span>Actions</span>
    </div>`
}

function createBaseTable() {
    let parent = document.querySelector('.wrapper');
    parent.innerHTML += 
   `<div class="info-block">
        <div class="caption"></div>
        <div class="data"></div>
    </div>`
}

function setInfoToTable(arrCategory, arrName) {
    let parent = document.querySelector('.data');

    for (let i = 0; i < arrCategory.length; i++) { 
        parent.innerHTML += 
        `<div data-category="${arrCategory[i].id}">
            ${createActionButton(arrCategory[i].id, arrName).outerHTML}
        </div>`;
    }
    return parent;
}

function setDataToTable(array) {
    for (let i = 0; i < array.length; i++) {
        setValue(array[i].id, array[i].name);
    }
}

function setAutoDataToTable() {
    for (let i = 0; i < autoArr.length; i++) {
        setValue(autoArr[i].id, autoArr[i].mark);
    }
}

function setValue(id, value) {

    let category = document.querySelector(`div[data-category="${id}"]`);
    if (category !== null) {
       category.insertAdjacentHTML('afterbegin', `<div>${value}</div>`); 
    } else {
        return;
    }
    
}

function createActionButton(id, arr) {
    let div= document.createElement('div');
    div.classList.add('action-box');
    div.innerHTML = 
    `<button type="button" data-category="${id}" class="btn btn-success view ${arr}">View</button>
    <button type="button" data-category="${id}" class="btn btn-warning edit ${arr}">Edit</button>
    <button type="button" data-category="${id}" class="btn btn-danger delete ${arr}">Delete</button>`;

    return div;
}

function createForm(nameForm) {
    const form = document.createElement('form');
    form.setAttribute('name', nameForm);
    form.classList.add('form-control');

    return form;
}

function createButton(parent, attr, value) {
    let button = document.createElement('button');
    button.classList.add(attr);
    parent.appendChild(button);
    button.innerHTML += value;

    return button;
}

function createInputs(labelName, typeInput, nameInput, idInput, placeholderValue) {
    const label = document.createElement('label');
    label.setAttribute('for', idInput);
    label.innerHTML = labelName;

    let input = document.createElement('input');
    input.setAttribute('type', typeInput);
    input.setAttribute('name', nameInput);
    input.setAttribute('id', idInput);
    input.setAttribute('value', placeholderValue);

    label.appendChild(input);
    label.insertAdjacentHTML('beforeend',  `<div class="hidden error" id="${nameInput}-error">${nameInput} is not correct</div>`);
    return label;

}

function createDeleteBlock(array) {
    let block = document.querySelector('.action-block');
    block.innerHTML = `
    <div class="delete-popup">
        <p class = 'list-items'>Are you sure?</p>
        <button class = '${array} cancel btn btn-success'>Cancel</button>
        <button class = '${array} confirm btn btn-danger'>Delete</button>
    </div>
    `;
}

function addDeleteDataListener(selectedDataCategory) {
    const button = document.querySelector('.delete-popup');
  
    button.addEventListener('click', function(e) {
        button.innerHTML = '';
        if (e.target.classList.contains('cancel')) {
            return;
        } else if (e.target.classList.contains('confirm') && e.target.classList.contains('human') ) {
            deleteData(humansArr, selectedDataCategory); 
        } else if (e.target.classList.contains('confirm') && e.target.classList.contains('company') ) {
            deleteData(companiesArr, selectedDataCategory); 
        } else if (e.target.classList.contains('confirm') && e.target.classList.contains('auto') ) {
            deleteData(autoArr, selectedDataCategory); 
        }
        updateStorageData();
    });
}

function deleteData(array, selectedDataCategory) {
    for (let i = 0; i < array.length; i++) {
        if (selectedDataCategory === parseInt(array[i].id)) {
            const wrapper = document.querySelector('.data');
            const divCategory = document.querySelector(`[data-category="${selectedDataCategory}"]`);

            wrapper.removeChild(divCategory);
            array.splice(i, 1); 
            break; 
        }
    }
}

function createButtonAddUser(marker) {
    const parent = document.querySelector('.info-block');
    let button = document.createElement('button');
    button.classList.add('add-btn', 'btn-warning', 'btn', marker);

    if (parent.querySelector('.add-btn')) {
        parent.removeChild(parent.childNodes[0]);
    }
   
    parent.insertAdjacentElement("afterbegin", button);
    button.innerHTML += 'Add user';
    

    return button;
}

function createCloseButton(parent) {
    let wrapper = document.querySelector(parent);
    wrapper.innerHTML += `
    <button type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>`;
    addCloseListener();
}

// -----------------------------------------------------------------------  getID

function getId(element, attributeName) {
    let value = element.getAttribute(attributeName);

    if (!value) {
        value = element.parentNode.getAttribute(attributeName);
    
          if (!value) {
              return null;
          }
      }
    
    return value;
}


// ----------------------------------------------------------------------- 

function chooseClikedButton(createClass, name, setInfo, arr, arrName, setClass) {
    if (document.querySelector('.caption').firstChild) {
        document.querySelector('.caption').innerHTML = '';
        document.querySelector('.data').innerHTML = '';
        createClass(name);
        setInfo(arr, arrName);
        setClass(arr);
    } else {
        createClass(name);
        setInfo(arr, arrName);
        setClass(arr);
    } 
}

function addListenerToInfoButton() {
    
    let button = document.querySelector('.buttons-box'); 

    button.addEventListener('click', function(e) {

        if (e.target.classList.contains('human')) {
            chooseClikedButton(createTable, 'Person Name', setInfoToTable, humansArr, 'human', setDataToTable);
            createButtonAddUser('human');
            addAddUserListeners(humansArr);
        } 
        if (e.target.classList.contains('company')) {
            chooseClikedButton(createTable, 'Company Name', setInfoToTable, companiesArr, 'company', setDataToTable);
            createButtonAddUser('company');
            addAddUserListeners(companiesArr);
        } 
        if (e.target.classList.contains('auto')) {
            chooseClikedButton(createTable, 'Car Mark', setInfoToTable, autoArr, 'auto', setAutoDataToTable);
            createButtonAddUser('auto');
            addAddUserListeners(autoArr);
        }
    
    });
    addListenerToActions();
}

function addListenerToActions() {
    let button = document.querySelector('.data'); 
    let parent = document.querySelector('.wrapper');
    let div = document.createElement('div');
    div.classList.add('action-block');
    parent.appendChild(div);

    button.addEventListener('click', function(e) {
        let selectedDataCategory = parseInt(getId(e.target, "data-category"));
        let actionblock = document.querySelector('.action-block');

        if (actionblock.classList.contains('hidden')) {
           actionblock.classList.remove('hidden'); 
        }
        
        if (e.target.classList.contains('view') && e.target.classList.contains('human')) {
            div.innerHTML = '';
            for (let key in humansArr) {
                if (selectedDataCategory === parseInt(humansArr[key].id)) {
                    div.innerHTML += 
                    `<p>Name: ${humansArr[key].name}</p>
                    <p>Card Balance: ${humansArr[key].balance}</p>
                    <p>Phone number: ${humansArr[key].tel}</p>`

                    if (humansArr[key].car) {
                        div.innerHTML += 
                        `<p>Property: ${humansArr[key].car}</p>`
                    } else {
                        div.innerHTML += 
                        `<p>There is no property </p>`
                    }
                    createBurgainButtons(selectedDataCategory);
                } 
            }
            createCloseButton('.action-block');
        }
        if (e.target.classList.contains('view') && e.target.classList.contains('company')) {
            div.innerHTML = '';
            for (let key in companiesArr) {
                    if (selectedDataCategory === parseInt(companiesArr[key].id)) {
                    div.innerHTML += 
                    `<p>Name: ${companiesArr[key].name}</p>
                    <p>Card Balance: ${companiesArr[key].balance}</p>
                    <p>Phone number: ${companiesArr[key].tel}</p>
                    <p>People amount: ${companiesArr[key].workersAmount}</p>`

                    if (companiesArr[key].car) {
                        div.innerHTML += 
                        `<p>Property: ${companiesArr[key].car}</p>`
                    } else {
                        div.innerHTML += 
                        `<p>There is no property </p>`
                    }
                    createBurgainButtons(selectedDataCategory);
                } 
            } 
            createCloseButton('.action-block');
        }
        if (e.target.classList.contains('view') && e.target.classList.contains('auto')) {
            div.innerHTML = '';
            for (let key in autoArr) {
                if (selectedDataCategory === parseInt(autoArr[key].id)) {
                    div.innerHTML += 
                    `<p>Mark: ${autoArr[key].mark}</p>
                    <p>Year: ${autoArr[key].year}</p>
                    <p>Price: ${autoArr[key].price}</p>`
                }
            } 
            createCloseButton('.action-block');
        }

        
        if (e.target.classList.contains('edit') && e.target.classList.contains('human')) {
            div.innerHTML = '';
            const form = createForm('editForm');
            createCloseButton('.action-block');

            for (let key in humansArr) {
                if (selectedDataCategory === parseInt(humansArr[key].id)) {
                    form.appendChild(createInputs('Name: ', 'text', 'name', 'name-field', humansArr[key].name));
                    form.appendChild(createInputs('Balance: ', 'text', 'balance', 'balance-field', humansArr[key].balance));
                    form.appendChild(createInputs('Tel: ', 'text', 'tel', 'tel-field', humansArr[key].tel));
                    let buttonConf = form.appendChild(createButton(form, 'confirm-button', 'Confirm'));
                    buttonConf.classList.add('btn', 'btn-success', 'human-btn');
                }
            }
            div.appendChild(form);
            addEditListeners(selectedDataCategory);
        }

        if (e.target.classList.contains('edit') && e.target.classList.contains('company')) {
            div.innerHTML = '';
            const form = createForm('editForm');
            createCloseButton('.action-block');

            for (let key in companiesArr) {
                if (selectedDataCategory === parseInt(companiesArr[key].id)) {
                    form.appendChild(createInputs('name: ', 'text', 'name', 'name-field', companiesArr[key].name));
                    form.appendChild(createInputs('Balance: ', 'text', 'balance', 'balance-field', companiesArr[key].balance));
                    form.appendChild(createInputs('Tel: ', 'text', 'tel', 'tel-field', companiesArr[key].tel));
                    form.appendChild(createInputs('People amount: ', 'text', 'workersAmount', 'workersAmount-field', companiesArr[key].workersAmount));
                    let buttonConf = form.appendChild(createButton(form, 'confirm-button', 'Confirm'));
                    buttonConf.classList.add('btn', 'btn-success', 'company-btn');
                }
            }
            div.appendChild(form);
            addEditListeners(selectedDataCategory);
        }

        if (e.target.classList.contains('edit') && e.target.classList.contains('auto')) {
            div.innerHTML = '';
            const form = createForm('editForm');
            createCloseButton('.action-block');

            for (let key in autoArr) {
                if (selectedDataCategory === parseInt(autoArr[key].id)) {
                    form.appendChild(createInputs('Mark: ', 'text', 'mark', 'mark-field', autoArr[key].mark));
                    form.appendChild(createInputs('Year: ', 'text', 'year', 'year-field', autoArr[key].year));
                    form.appendChild(createInputs('Price: ', 'text', 'price', 'price-field', autoArr[key].price));
                    let buttonConf = form.appendChild(createButton(form, 'confirm-button', 'Confirm'));
                    buttonConf.classList.add('btn', 'btn-success', 'auto-btn');
                }
            }
            div.appendChild(form);
            addEditListeners(selectedDataCategory);
        }

        if (e.target.classList.contains('delete') && e.target.classList.contains('human')) {
            div.innerHTML = '';

            for (let key in humansArr) {
                if (selectedDataCategory === parseInt(humansArr[key].id)) {
                    createDeleteBlock('human');
                    addDeleteDataListener(selectedDataCategory);
                }
            }
        }

        if (e.target.classList.contains('delete') && e.target.classList.contains('company')) {
            div.innerHTML = '';

            for (let key in companiesArr) {
                if (selectedDataCategory === parseInt(companiesArr[key].id)) {
                    createDeleteBlock('company');
                    addDeleteDataListener(selectedDataCategory);
                }
            }
        }

        if (e.target.classList.contains('delete') && e.target.classList.contains('auto')) {
            div.innerHTML = '';

            for (let key in autoArr) {
                if (selectedDataCategory === parseInt(autoArr[key].id)) {
                    createDeleteBlock('auto');
                    addDeleteDataListener(selectedDataCategory);
                }
            }
        }
    });
}

function createSelectInput() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('select');
    wrapper.innerHTML += 'Choose car';
    const select = document.createElement('select');
    select.setAttribute('name', 'car')
    select.innerHTML = '';
    for (let i = 0; i < autoArr.length; i++) {
        select.innerHTML += `<option>${autoArr[i].mark}</option>`;
    }
   
    wrapper.appendChild(select); 
    wrapper.innerHTML += `<div class="hidden error" id="car-error">car is not correct</div>`
    return wrapper;
}

function addEditListeners(selectedDataCategory) {
    const confButton = document.querySelector('.confirm-button');
    
    confButton.addEventListener('click', function(e) {
        const form = document.querySelector('form');

        const validElements = {};           
        const elementsArr = Object.values(form);
            
        for (let element of elementsArr) {
        if (!element.name) {
            continue;
        }

        const isValidValue = isValid(element.value, element.name);
                        
        if (isValidValue) {
            if (element.name === 'id') {
                findID(element.name, element.value, validElements, form); 
            } else {
                validElements[element.name] = element.value;
            }
        } else {
            event.preventDefault();
            delete validElements[element.name];
        }

        validate(isValidValue, element.name);    
        
        }

        editElement(e, validElements, selectedDataCategory);
        return validElements;
    });
    
}

function findID(elementName, elementValue, validElements, form) {
    for (let i = 0; i < humansArr.length; i++) {
        if (humansArr[i].id === parseInt(elementValue)) {
            event.preventDefault();
            delete validElements[elementName];
            let errorIdText = document.createElement('p');
            errorIdText.classList.add('wrongID');
            errorIdText.remove();
                if (form.querySelector('.wrongID')) {
                    form.removeChild(form.childNodes[0]);
                } 
            errorIdText.innerHTML += "This ID has already used"
            form.insertAdjacentElement('afterbegin', errorIdText); 
            return;
        } else {
            if (form.querySelector('.wrongID')) {
                form.removeChild(form.childNodes[0]);
            } 
            validElements[elementName] = elementValue; 
        }
    }
    for (let i = 0; i < companiesArr.length; i++) {
        if (companiesArr[i].id === parseInt(elementValue)) {
            event.preventDefault();
            delete validElements[elementName];
            let errorIdText = document.createElement('p');
            errorIdText.classList.add('wrongID');
            errorIdText.remove();
                if (form.querySelector('.wrongID')) {
                    form.removeChild(form.childNodes[0]);
                } 
            errorIdText.innerHTML += "This ID has already used"
            form.insertAdjacentElement('afterbegin', errorIdText); 
            return;
        } else {
            if (form.querySelector('.wrongID')) {
                form.removeChild(form.childNodes[0]);
            } 
            validElements[elementName] = elementValue; 
        }
    }
    for (let i = 0; i < autoArr.length; i++) {
        if (autoArr[i].id === parseInt(elementValue)) {
            event.preventDefault();
            delete validElements[elementName];
            let errorIdText = document.createElement('p');
            errorIdText.classList.add('wrongID');
            errorIdText.remove();
                if (form.querySelector('.wrongID')) {
                    form.removeChild(form.childNodes[0]);
                } 
            errorIdText.innerHTML += "This ID has already used"
            form.insertAdjacentElement('afterbegin', errorIdText); 
            return;
        } else {
            if (form.querySelector('.wrongID')) {
                form.removeChild(form.childNodes[0]);
            } 
            validElements[elementName] = elementValue; 
        }
    }
}

function editElement(e, element, selectedDataCategory) {
    if ( Object.keys(element).includes('key')) {
        event.preventDefault();
        return;
    } else {
        if (e.target.classList.contains('human-btn')) {
            for (let i = 0; i < humansArr.length; i++) {
                if (selectedDataCategory === humansArr[i].id) {
                    let id = humansArr[i].id;
                    humansArr[i] = element;
                    humansArr[i].id = id;
                }
            }
            updateStorageData();
        } else if (e.target.classList.contains('company-btn')) {
            for (let i = 0; i < companiesArr.length; i++) {
                if (selectedDataCategory === companiesArr[i].id) {
                    let id = companiesArr[i].id;
                    companiesArr[i] = element;
                    companiesArr[i].id = id;
                }
            }
            updateStorageData();
        } else if (e.target.classList.contains('auto-btn')) {
            for (let i = 0; i < autoArr.length; i++) {
                if (selectedDataCategory === autoArr[i].id) {
                    let id = autoArr[i].id;
                    autoArr[i] = element;
                    autoArr[i].id = id;
                }
            }
            updateStorageData();
            }
        }
    }

function addAddUserListeners() {
    const button = document.querySelector('.add-btn');
    let wrapper = document.querySelector('.action-block');
    
    button.addEventListener('click', function(e) {
        wrapper.innerHTML = ''; 
        wrapper.classList.remove('hidden');
        const form = createForm('addForm');

        if (e.target.classList.contains('human')) {
            form.appendChild(createInputs('ID: ', 'text', 'id', 'id-field', ''));
            form.appendChild(createInputs('Name: ', 'text', 'name', 'name-field', ''));
            form.appendChild(createInputs('Balance: ', 'text', 'balance', 'balance-field', ''));
            form.appendChild(createInputs('Tel: ', 'text', 'tel', 'tel-field', ''));
            form.appendChild(createSelectInput());
            let buttonSave = form.appendChild(createButton(form, 'save-button', 'Save')); 
            buttonSave.classList.add('btn', 'btn-success', 'human');

        } else if (e.target.classList.contains('company')) {
            form.appendChild(createInputs('ID: ', 'text', 'id', 'id-field', ''));
            form.appendChild(createInputs('name: ', 'text', 'name', 'name-field', ''));
            form.appendChild(createInputs('Balance: ', 'text', 'balance', 'balance-field', ''));
            form.appendChild(createInputs('Tel: ', 'text', 'tel', 'tel-field', ''));
            
            form.appendChild(createInputs('Workers amount: ', 'text', 'workersAmount', 'workersAmount-field', ''));
            form.appendChild(createSelectInput());
            let buttonSave = form.appendChild(createButton(form, 'save-button', 'Save')); 
            buttonSave.classList.add('btn', 'btn-success', 'company');
        } else if (e.target.classList.contains('auto')) {
            form.appendChild(createInputs('ID: ', 'text', 'id', 'id-field', ''));
            form.appendChild(createInputs('Mark: ', 'text', 'mark', 'mark-field', ''));
            form.appendChild(createInputs('Year: ', 'text', 'year', 'year-field', ''));
            form.appendChild(createInputs('Price: ', 'text', 'price', 'price-field', ''));
            let buttonSave = form.appendChild(createButton(form, 'save-button', 'Save')); 
            buttonSave.classList.add('btn', 'btn-success', 'auto');
        }
       
        wrapper.appendChild(form);
        
        createCloseButton('.action-block');
        addSaveListeners();
    });
}
    
function addCloseListener() {
    let button = document.querySelector('.close');

    button.addEventListener('click', function() {
        let infoblock = document.querySelector('.action-block');
        infoblock.classList.add('hidden');
        if (document.querySelector('.aware')) {
            document.querySelector('.aware').classList.add('hidden');
        }
    })
}   

// ------------------------------------------------------ validation

function addSaveListeners() {
    const saveButton = document.querySelector('.save-button');
    const validElements = {};

    saveButton.addEventListener('click', function(e) {
        const form = document.querySelector('form');
        
        const elementsArr = Object.values(form);

        for (let element of elementsArr) {
        if (!element.name) {
            continue;
        }
            
        const isValidValue = isValid(element.value, element.name);

        if (isValidValue) {
            if (element.name === 'id') {
                    findID(element.name, element.value, validElements, form); 
                } else if (element.name === 'car') { 
                    for (let i = 0; i < autoArr.length; i++) {
                        if (autoArr[i].mark === element.value) {
                            if (autoArr[i].price <= parseInt(validElements.balance)) {
                                if (form.querySelector('.wrongCar')) {
                                    form.removeChild(form.childNodes[0]);
                                } 
                                validElements[element.name] = element.value;
                                validElements.balance = validElements.balance - autoArr[i].price;
                            } else {
                            event.preventDefault();
                            delete validElements[element.name];
                            let errorIdText = document.createElement('p');
                            errorIdText.classList.add('wrongCar');
                            errorIdText.remove();
                                if (form.querySelector('.wrongCar')) {
                                    form.removeChild(form.childNodes[0]);
                                } 
                            errorIdText.innerHTML += "You have not money for purchase"
                            form.insertAdjacentElement('afterbegin', errorIdText); 
                            }
                        }
                    }
                } else {
                validElements[element.name] = element.value;
            }
        } else {
            event.preventDefault();
            delete validElements[element.name];
        }

        validate(isValidValue, element.name);    
        
        }

        if (e.target.classList.contains('human') && form.querySelectorAll('.hidden').length === 5 && !form.querySelector('p')) {
            humansArr.push(validElements);
            updateStorageData();
        } else if (e.target.classList.contains('company') && form.querySelectorAll('.hidden').length === 6 && !form.querySelector('p')) {
            companiesArr.push(validElements);
            updateStorageData();
        } else if (e.target.classList.contains('auto') && form.querySelectorAll('.hidden').length === 4  && !form.querySelector('p')) {
            autoArr.push(validElements);
            updateStorageData();
        }
        
    });
    return validElements;
}

function validate(isValid, key) {    
    if (!isValid) { 
        document.getElementById(key + '-error').classList.remove('hidden');
    } else {
        document.getElementById(key + '-error').classList.add('hidden');
    }
}

function isValid(value, key) {
    let userRegExps = setPatterns();
    return userRegExps[key].test(value);
}


function setPatterns() {
    const pattern = {
        id: /^[0-9]{1,}$/g,
        name: /^[A-Z][a-z]{1,20}$/g,
        owner: /^[A-Z][a-z]{1,20}$/g,
        mark: /^[A-Z][a-z]{1,20}\s?[A-Z]?[a-z]{1,20}?$/g,
        year: /^[0-9]{4}$/g,
        workersAmount: /^[0-9]{1,}$/,
        balance: /^[0-9]{1,}$/g,
        tel: /^\+?38\s[0-9]{3}\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/g,
        price: /^[0-9]{1,}$/g,
        car: /^[A-Z][a-z]{1,20}$/g,
    }
    
    return pattern;
}  

// ------------------------------ buy/sold

function createBurgainButtons(selectedDataCategory) {
    const buttonWrapper = document.createElement('div');
    const wrapperBlock = document.querySelector('.action-block');

    buttonWrapper.classList.add('burgain-buttons');
    buttonWrapper.innerHTML += 
    `
    <button class="buy-button btn btn-outline-danger">Buy car</button>
    <button class="sold-button btn btn-outline-success">Sold car</button>
    `

    wrapperBlock.appendChild(buttonWrapper);
    addBurgainListener(selectedDataCategory);
    
}

function addBurgainListener(selectedDataCategory) {
    const button = document.querySelector('.action-block');

    button.addEventListener('click', function(e) {
        if (e.target.classList.contains('buy-button')) {
            chechProperty(humansArr, selectedDataCategory, button);
            chechProperty(companiesArr, selectedDataCategory, button);
            event.stopImmediatePropagation()
        }
        if (e.target.classList.contains('sold-button')) {
            for (let key in humansArr) {
                if (selectedDataCategory === parseInt(humansArr[key].id)) {
                    if (humansArr[key].car) {
                        createDeleteBlock();
                        addListenerForSoldCar(selectedDataCategory, humansArr);
                    } else {
                        const div = document.createElement('div');
                        clearAwareBlock('.aware');
                        div.classList.add('aware');
                        div.innerHTML += 'You don`t have any cars'; 
                        const burgainButtons = document.querySelector('.burgain-buttons');
                        burgainButtons.classList.add('hidden');
                        button.appendChild(div);
                    }
                }
            }
            for (let key in companiesArr) {
                if (selectedDataCategory === parseInt(companiesArr[key].id)) {
                    if (companiesArr[key].car) {
                        createDeleteBlock();
                        addListenerForSoldCar(selectedDataCategory, companiesArr);
                    } else {
                        const div = document.createElement('div');
                        clearAwareBlock('.aware');
                        div.classList.add('aware');
                        div.innerHTML += 'You don`t have any cars'; 
                        const burgainButtons = document.querySelector('.burgain-buttons');
                        burgainButtons.classList.add('hidden');
                        button.appendChild(div);
                    }
        
            }
        }
    }
    });
}

function chechProperty(array, selectedDataCategory, button) {
    for (let key in array) {
        if (selectedDataCategory === parseInt(array[key].id)) {
            if (array[key].car) {
                const div = document.createElement('div');
                clearAwareBlock('.aware');
                clearAwareBlock('.select');
                div.classList.add('aware');
                div.innerHTML += 'You have car';
                const burgainButtons = document.querySelector('.burgain-buttons');
                burgainButtons.classList.add('hidden');
                button.appendChild(div);
            } else {
                clearAwareBlock('.aware');
                clearAwareBlock('.select');

            button.appendChild(createSelectInput());
            button.appendChild(createBuyButton());
            addBuyListener(selectedDataCategory, array);
            const burgainButtons = document.querySelector('.burgain-buttons');
            burgainButtons.classList.add('hidden');
            }
        }
    }
}


function addListenerForSoldCar(selectedDataCategory, array) {
    const button = document.querySelector('.delete-popup');

    button.addEventListener('click', function(e) {
        if (e.target.classList.contains('cancel')) {
            button.classList.add('hidden');
            return;
        }
        if (e.target.classList.contains('confirm')) {
            for (let key in array) {
                if (selectedDataCategory === parseInt(array[key].id)) {
                    const div = document.createElement('div');
                    div.innerHTML += 
                    `<p>There is no more property </p>`;
                    
                    const price = findCurrentCar(array[key].car);
                    array[key].balance = array[key].balance + price;
                    delete array[key].car;
                    button.classList.add('hidden');
                    const wrarrep = document.querySelector('.action-block');
                    wrarrep.appendChild(div);
                    updateStorageData();
                }
            }
        }
    });
}

function findCurrentCar(car) {
    for (let key in autoArr) {
        if (car === autoArr[key].mark) {
            return autoArr[key].price;
        }
    }
}

function clearAwareBlock(selector) {
    const button = document.querySelector('.action-block');

    if (document.querySelector(selector)) {
        button.lastChild.remove();
    }
}

function createBuyButton() {
    const button = document.createElement('button');
    button.classList.add('select-and-buy', 'btn', 'btn-success')
    button.innerText = 'Buy';

    return button;
}

function addBuyListener(selectedDataCategory, array) {
    const button = document.querySelector('.select-and-buy');
    const parent = document.querySelector('.action-block')

    button.addEventListener('click', function() {
        const selectCarindex = document.querySelector('select').options.selectedIndex;
        const selectedCar = document.querySelector('select').options[selectCarindex].text;

        for (let key in array) {
            if (selectedDataCategory === parseInt(array[key].id)) {
               
                    for (let i = 0; i < autoArr.length; i++) { 
                        if (selectedCar === autoArr[i].mark) {
                            if (autoArr[i].price <= parseInt(array[key].balance)) {
                                if (document.querySelector('.wrongCar')) {
                                    parent.removeChild(parent.childNodes[0]);
                                } 
                                array[key].car = selectedCar;
                                array[key].balance = array[key].balance - autoArr[i].price;
                                updateStorageData();
                                location.reload();
                            } else {
                                let errorIdText = document.createElement('p');
                                errorIdText.classList.add('wrongCar');
                                errorIdText.remove();

                                if (document.querySelector('.wrongCar')) {
                                    parent.removeChild(parent.childNodes[0]);
                                } 

                                errorIdText.innerHTML += "You have not money for purchase"
                                parent.insertAdjacentElement('afterbegin', errorIdText); 
                            
                        }
                    }
                }
            }
        }
    });
}