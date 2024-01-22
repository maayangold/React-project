import { Link } from "react-router-dom";
import React from 'react'
import FirstMenu from "./header/firstMenu";
import { Image } from "semantic-ui-react";

export default function Entery() {


    return (<>
        <div >
          
            <h4>ברוכים הבאים לאתר המתכונים יאמי!</h4> 
            <h2>🍰🥞🍨🥪</h2>
            <h4>כאן תוכלו למצוא מתכונים מיוחדים ושווים-אז קדימה תהנו!!!</h4>
            <Image className="img" src='https://tzahishivuk.com/wp-content/uploads/2021/11/1-41.png' size='small' />         
            <Link to="/notFound" style={{ color: "coral", textDecoration: "none", position: "absolute", left: "10%", top: "80%" }}   >
           <p className="help">💡Help ⚙️Setting</p>
            </Link>


        </div >

    </>
    );
} 