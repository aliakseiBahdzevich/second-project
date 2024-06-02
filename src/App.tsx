import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Api, { Classmate } from './api/api';
import FlatList from 'flatlist-react/lib';


function App() {
  const api = new Api({});
  const [changeName, setChangeName] = useState('');
  const [changeSurname, setChangeSurname] = useState('');
  const [changeAge, setChangeAge] = useState<number>();
  const [changeSex, setChangeSex] = useState('');
  const [changeIscrazy, setChangeIscrazy] = useState<boolean>();
  
  const [isLoading, setIsloading] = useState(false); //загрузка на странице 
  const [isShow, setIsShow] = useState(false);
  const [classmates, setClassmates] = useState<Classmate[]>([]); //массив одноклассников 
  const [error, setError] = useState(''); //состояние ошибки 
  
  

  useEffect (() => { //для get-запроса 
    setIsloading(true)
    api.getClassmates()
      .then((res)=>setClassmates(res.data))
      .finally(()=>setIsloading(false))
  }, []);

  
  const add = () => {
    setIsShow(true);
  };

  const confirmName = () => {
    api.setClassmates({
      // age: changeAge,
      // isCrazy: changeIscrazy,
      name: changeName,
      surname: changeSurname,
      sex: changeSex
    })
      .then(() => setClassmates([...classmates, {
        // age: changeAge,
        // isCrazy: changeIscrazy,
        name: changeName,
        surname: changeSurname,
        sex: changeSex
      }]))
      .catch((err)=>setError(err))
    setIsShow(false);
  };
  
  

  const del = (id: string) => { //удаление элемента с кнопки 
    api.delClassmates(id)//удауление с бэка 
      .then(() => setClassmates(classmates.filter((el) => el.id !== id))) //удаление с фронта
      .catch((err) => setError(err))
  };

  useEffect (() => {
    if (changeName.length === 0) {
      setError('write name: ')
    }
    else if (changeSurname.length === 0) {
      setError('write surname: ')
    }
    else if (changeSex.length === 0) {
      setError('write sex: ')
    }
    else {
      setError('')
    }
  }, [changeName, changeSurname, changeSex])
  


  return (
    <div>
      {isLoading && <span>Loading...</span>}
      
      <button onClick={() => add()}><h1>add classmate</h1></button>
      {isShow && <div style={{ zIndex: 2, top: 0, background: '#000000d0', position: 'fixed', height: '100%', width: '100%' }} />}
      {isShow &&
        <div style={{ zIndex: 3, position: "fixed", backgroundColor: '#fef9dc', width: '70%', height: '70%', left: '15%', right: '15%', top: '15%', bottom: '15%', borderRadius: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h5>Name: </h5>
          <input onChange={(event) => {setChangeName(event.target.value) }} value={changeName}/>
          <h5>Surname: </h5>
          <input onChange={(event) => {setChangeSurname(event.target.value) }} value={changeSurname}/>
          {/* <h5>Age: </h5> */}
          {/* <input onChange={(event) => {setChangeAge(event.target.value) }} value={changeAge}/> */}
          <h5>Sex: </h5>
          <input onChange={(event) => {setChangeSex(event.target.value) }} value={changeSex}/>
          {/* <h5>isCrazy: </h5> */}
          {/* <input onChange={(event) => {setChangeIscrazy(event.target.value) }} value={changeIscrazy}/> */}
          <button disabled={!!error.length} onClick={()=>confirmName()}><h3>Confirm</h3></button>
          
        </div>}
        
      <FlatList list={classmates} renderItem={(item, id) => <div><h1>{item.name} {item.surname}  {item.sex} </h1> <button onClick={()=>del(id)}><h1>delete</h1></button></div>}/>

    </div>
  );
}

export default App;
