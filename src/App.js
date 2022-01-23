import { useState ,useEffect } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import ListForm from "./Components/listForm/listForm.js";
import Form from "./Components/form/form.js";
import Filter from "./Components/filter/Filter.js";

const useLocalStorage = (key, defaultValue) => {
  const [state,setState] = useState(() => {
     const contacts = localStorage.getItem("phonebook");
    if (!contacts) {
      return;
    }
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });
  return [state ,setState]
}

export default function App (){


  const [contacts, setContacts] = useLocalStorage('phonebook' , [] )
  const[filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem("phonebook", JSON.stringify(contacts))
  }
, [contacts])
  
  const formSubmitHandler = (data) => {
   console.log (contacts)
    data.id = nanoid();
  contacts.find((contact) =>contact.name.toLocaleLowerCase() 
  === data.name.toLocaleLowerCase() )
      ? alert("Такое имя уже занято")
      : setContacts( [...contacts, data] , contacts);
  };
 const changeFilter = (event) => {
  setFilter( event.currentTarget.value)
  };

 const findContact = () => {
 
    const normalizedFilter = filter.toLocaleLowerCase();
    if (filter.length) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    } else {
      return contacts;
    }
  };

  const deletedContact = (contactId) => {
  setContacts ( contacts.filter((contact) => contact.id !== contactId))

  };
    return (
      <div>
        <Form onSubmit={formSubmitHandler} valueForm={contacts}></Form>
        <Filter valueFilter={filter} onChange={changeFilter}></Filter>
        <ListForm
          onContacts={findContact}
          onDelete={deletedContact}
        ></ListForm>
      </div>
    );
  }


