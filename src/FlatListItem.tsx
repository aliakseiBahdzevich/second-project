import React from "react";

type Props = {
    item: any;
    del: (id?: string) => void;
    add: (id?: string) => void;
};

function FlatListItem({item, del, add}: Props) {
    return (
        <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8, margin: 30, padding: 10, textAlign: 'left', backgroundColor: '#f0f2f5', boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)'}}>
            <div style = {{fontFamily: 'Helvetica', color: '#1c1e21'}}>
                <h3>Name: {item.name}</h3> 
                <h3>Surname: {item.surname}</h3> 
                <h3>Gender: {item.gender}</h3> 
                <h3>Age: {item.age}</h3>
                <h3>Is crazy: {item.isCrazy ? 'yes' : 'no'}</h3> 
            </div>
            <div>
                <button style = {{ backgroundColor: 'rgb(255, 79, 95)', borderRadius: 10, fontFamily: 'Helvetica', fontSize: 10, color: '#fff', border: 'none', boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)', height: '100%'}} onClick={()=>del(item?.id)}>
                    <h1>delete</h1>
                </button>
                <button style = {{ margin: 5, marginTop: '0', backgroundColor: '#0866ff', borderRadius: 10, fontFamily: 'Helvetica', fontSize: 10, color: '#fff', border: 'none', boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)', height: '100%'}} onClick={()=>add(item?.id)}>
                    <h1>redact</h1>
                </button>
            </div>
        </div>
    )
};




export default FlatListItem;