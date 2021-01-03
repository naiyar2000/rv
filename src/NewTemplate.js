import React from 'react';
import "./NewTemplate.css"

const NewTemplate = ({title, notice, date}) => {
    let _date = date.toDate().toDateString();
    return (
        <div className="NewsSection">
            <h2>{title}<span>{_date}</span></h2>
            <p>{notice}</p>
        </div>
    )
}

export default NewTemplate
