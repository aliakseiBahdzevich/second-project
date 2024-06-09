import { useEffect, useState } from 'react';
import './App.css';
import Api, { Classmate } from './api/api';
import FlatList from 'flatlist-react/lib';
import FlatListItem from './FlatListItem';
import BodyItem from './BodyItem';


function App() {
  
  const api = new Api({});
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState('');
  const [isCrazy, setIsCrazy] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [isLoading, setIsloading] = useState(false); //загрузка на странице 
  const [isShow, setIsShow] = useState(false);
  const [classmates, setClassmates] = useState<Classmate[]>([]); //массив одноклассников 
  const [error, setError] = useState(''); //состояние ошибки 
  const [search, setSearch] = useState('');
  const [classmatesByName, setClassmatesByName] = useState<Classmate[]>([]);
  
  useEffect (() => { //для get-запроса 
    setIsloading(true)
    api.getClassmates()
      .then((res)=>setClassmates(res.data))
      .finally(()=>setIsloading(false))
  }, []);
  
  const add = (id?: string) => {
    setIsShow(true);
    if (id){
      setId(id);
      classmates.filter((el)=>{
        if(el.id===id){
          setAge(el.age.toString())
          setGender(el.gender)
          setIsCrazy(el.isCrazy)
          setName(el.name)
          setSurname(el.surname)
        }
      })
    }
  };

  const confirmName = () => {
    if (id) {
      api.updateClassmates(id, {
        age: parseInt(age),
        isCrazy,
        name,
        surname,
        gender,
        id
      })
      .then((res)=>setClassmates(classmates.map((el) =>{ 
        if(el.id===res.data.id){
          return res.data
        }
        else{
          return el
        }
      })))
      .catch((err)=>setError(err))
      setId('');
      setIsShow(false);
      setAge('');
      setIsCrazy(false);
      setName('');
      setSurname('');
      setGender('')
    }
    else {
      api.setClassmates({
        age: parseInt(age),
        isCrazy,
        name,
        surname,
        gender
      })
      .then((res) => setClassmates([...classmates, res.data]))
      .catch((err)=>setError(err))
      setIsShow(false);
      setAge('');
      setIsCrazy(false);
      setName('');
      setSurname('');
      setGender('')
    }
  };
    
  const del = (id?: string) => { //удаление элемента с кнопки 
    if (id){
      api.delClassmates(id)//удауление с бэка 
        .then((res) => setClassmates(classmates.filter((el) => el.id !== id))) //удаление с фронта
        .catch((err) => setError(err))
    }
  };

  useEffect (() => {
    if (name.length === 0) {
      setError('write name: ')
    }
    else if (surname.length === 0) {
      setError('write surname: ')
    }
    else if (gender === '') {
      setError('write gender: ')
    }
    else if (age.length === 0 || parseInt(age) < 0) {
      setError('write age: ')
    }
    else {
      setError('')
    }
  }, [name, surname, age, gender])

  const boxChange = () => {
    setIsCrazy(!isCrazy);
  }

  const maleGender = () => {
    setGender('male')
  }

  const femaleGender = () => {
    setGender('female')
  }

  useEffect(() => {
    if(search){
      setClassmatesByName(classmates.filter((el)=>(el.name.toLowerCase().includes(search.toLowerCase()))));
    }
    else{
      setClassmatesByName([]);
    }
  }, [search])

  return (
    <div style = {{textAlign: 'center', backgroundColor: '#fff', backgroundAttachment: 'fixe'}}>
      <BodyItem add={add} age={parseInt(age)} boxChange={boxChange} confirmName={confirmName} error={error} femaleGender={femaleGender} gender={gender} isCrazy={isCrazy} isLoading={isLoading} isShow={isShow} maleGender={maleGender} name={name} setAge={setAge} setName={setName} setSurname={setSurname} surname={surname} search={search} setSearch={setSearch}/>
      <FlatList list={classmatesByName.length === 0 ? classmates : classmatesByName} renderItem={(item) => <FlatListItem add={add} del={del} item={item}/>}/>
    </div>
  );
}

export default App;
