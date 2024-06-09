import React from "react";

type Props = {
    isLoading: boolean;
    add: () => void;
    isShow: boolean;
    setName: (value: string) => void;
    setSurname: (value: string) => void;
    name: string;
    surname: string;
    age: number;
    setAge: (value: string) => void;
    gender: string;
    maleGender: () => void;
    femaleGender: () => void;
    isCrazy: boolean;
    boxChange: () => void;
    error: string;
    confirmName: () => void;
    search: string;
    setSearch: (value: string) => void;
};

function BodyItem ({isLoading, add, isShow, setName, setSurname, name, surname, age, setAge, gender, maleGender, femaleGender, isCrazy, boxChange, error, confirmName, search, setSearch}: Props) {
    return (
        <>
        {isLoading && <span>Loading...</span>}
        <button style = {{marginTop: 30, backgroundColor: '#42b72a', borderRadius: 10, fontFamily: 'Helvetica', fontSize: 12, color: '#fff', border: 'none', boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)', width: '100px'}} onClick={() => add()}><h1>add</h1></button>
        <input placeholder="search by name" style = {{borderRadius: 8, marginInline: 30, padding: 6, border: '1px solid #dddfe2', boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)'}} onChange={(event)=>{setSearch(event.target.value)}} value={search}/>
        {isShow && <div style={{ zIndex: 2, top: 0, background: '#000000d0', position: 'fixed', height: '100%', width: '100%' }} />}
        {isShow &&
            <div style={{ zIndex: 3, position: "fixed", backgroundColor: '#fff', width: '65%', height: '65%', left: '17.5%', right: '17.5%', top: '17.5%', bottom: '17.5%', borderRadius:10, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 100}}>
                <h5>Name: </h5>
                <input style = {{borderRadius: 8, marginInline: 30, padding: 6, border: '1px solid #dddfe2', boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)'}} onChange={(event) => {setName(event.target.value) }} value={name}/>
                <h5>Surname: </h5>
                <input style = {{borderRadius: 8, marginInline: 30, padding: 6, border: '1px solid #dddfe2', boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)'}} onChange={(event) => {setSurname(event.target.value) }} value={surname}/>
                <h5>Age: </h5> 
                <input style = {{borderRadius: 8, marginInline: 30, padding: 6, border: '1px solid #dddfe2', boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)'}} type = 'number' onChange={(event) => {setAge(event.target.value) }} value={age}/>
                <h5>Gender: </h5>
                <label>
                    <input  type = 'radio' name = 'n'  checked = {gender === 'male'} onChange = {maleGender}/>
                    male
                </label>
                <label>
                    <input  type = 'radio' name = 'g'  checked = {gender === 'female'} onChange = {femaleGender}/>
                    female
                </label>
                <h5>isCrazy: </h5> 
                <input type = 'checkbox' checked={isCrazy} onChange={boxChange}/> 
                <button style = {{border: 'none', borderRadius: 10, marginBottom: 0, backgroundColor: '#42b72a', color: '#fff', fontFamily: 'Helvetica', boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)'}}disabled={!!error.length} onClick={()=>confirmName()}><h3>Confirm</h3></button>
            </div>}
            </>
    )
};

export default BodyItem;