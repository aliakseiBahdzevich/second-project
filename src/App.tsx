import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Api, { Classmate } from './api/api';
import FlatList from 'flatlist-react/lib';
import { isStringObject } from 'util/types';


function App() {
  const api = new Api({});
  const [changeName, setChangeName] = useState('');
  const [changeSurname, setChangeSurname] = useState('');
  const [changeAge, setChangeAge] = useState<string>('');
  const [changeSex, setChangeSex] = useState('');
  const [changeCrazy, setChangeCrazy] = useState<boolean>(false);
  
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
      age: parseInt(changeAge),
      isCrazy: changeCrazy,
      name: changeName,
      surname: changeSurname,
      sex: changeSex
    })
      .then((res) => setClassmates([...classmates, res.data]))
      .catch((err)=>setError(err))
    setIsShow(false);
    setChangeAge('');
    setChangeCrazy(false);
    setChangeName('');
    setChangeSex('');
    setChangeSurname('');
  };
  
  

  const del = (id?: string) => { //удаление элемента с кнопки 
    console.log(id)
    if (id){
      api.delClassmates(id)//удауление с бэка 
        .then((res) => setClassmates(classmates.filter((el) => el.id !== id))) //удаление с фронта
        .catch((err) => setError(err))
    }
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
    else if (changeAge.length === 0) {
      setError('write age: ')
    }
    else {
      setError('')
    }
  }, [changeName, changeSurname, changeSex, changeAge])

  const boxChange = () => {
    setChangeCrazy(!changeCrazy);
  }
  

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      <button onClick={() => add()}><h1>add classmate</h1></button>
      {isShow && <div style={{ zIndex: 2, top: 0, background: '#000000d0', position: 'fixed', height: '100%', width: '100%' }} />}
      {isShow &&
        <div style={{ zIndex: 3, position: "fixed", backgroundColor: '#fef9dc', width: '80%', height: '85%', left: '10%', right: '10%', top: '7.5%', bottom: '7.5%', borderRadius: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h5>Name: </h5>
          <input onChange={(event) => {setChangeName(event.target.value) }} value={changeName}/>
          <h5>Surname: </h5>
          <input onChange={(event) => {setChangeSurname(event.target.value) }} value={changeSurname}/>
          <h5>Age: </h5> 
          <input type = 'number' onChange={(event) => {setChangeAge(event.target.value) }} value={changeAge}/>
          <h5>Sex: </h5>
          <input onChange={(event) => {setChangeSex(event.target.value) }} value={changeSex}/>
          <h5>isCrazy: </h5> 
          <input type = 'checkbox' checked={changeCrazy} onChange={boxChange}/> 
          <button disabled={!!error.length} onClick={()=>confirmName()}><h3>Confirm</h3></button>
          
        </div>}
        
      <FlatList list={classmates} renderItem={(item) => <div><h1>{item.name} {item.surname} {item.sex} {item.age} {item.isCrazy && 'crazy'}</h1> <button onClick={()=>del(item?.id)}><h1>delete</h1></button></div>}/>

    </div>
  );
}

export default App;
