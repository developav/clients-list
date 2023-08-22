export default class Clients {
    constructor(id, surname, name, lastName, createdAt, updatedAt, contacts, remove, change) {
        this.id = id
        this.surname = surname
        this.name = name
        this.lastName = lastName
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.contacts = contacts
        this.remove = remove
        this.change = change
    }
    getfullName(){
        return this.surname + ' ' + this.name + ' ' + this.lastName
    }
    getRegData(){
        let yyyy = this.createdAt.getFullYear();
        let mm = this.createdAt.getMonth();
        let dd = this.createdAt.getDate();       
        return dd + '.' + mm + '.' + yyyy;
    }
    getChangeData(){
        let yyyy = this.updatedAt.getFullYear();
        let mm = this.updatedAt.getMonth();
        let dd = this.updatedAt.getDate();       
        return dd + '.' + mm + '.' + yyyy;
    }
    getContacts(){
        return this.contacts;
    }

    getRemove(){ 
        let button = document.createElement('button');
        return button;
    }
    getChange(){ 
        let buttonChange = document.createElement('button');
        return buttonChange;
    }
}
