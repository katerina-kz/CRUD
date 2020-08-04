'use strict';

function Owner() {
    this.addCar = function(ownerObj) {
        this.car = ownerObj;
    },
    this.setDataToTable = function() {
        let category = document.querySelector(`div[data-category="${this.id}"]`);
        if (category !== null) {
            $(category).prepend(`<div>${this.name}</div>`);
        } else {
            return;
        }
    };
}