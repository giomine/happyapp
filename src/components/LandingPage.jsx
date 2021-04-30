import React, { useState, useEffect } from "react";
import Bg from "./styledcomponents/Bg";
import Quote from "./styledcomponents/Quote";
import Welcome from "./styledcomponents/Welcome";
import { Link } from "react-router-dom";


function LandingPage(props) {
    const [quote, setQuote] = useState('');

    useEffect(() => {
            const quotes = fetch("https://quotes.rest/qod?language=en")
                .then(res => res.json())
                .then(data => {
                        var todaysQuote = '"' + data.contents.quotes[0].quote + '"';
                        var todaysAuthor = data.contents.quotes[0].author;
            
                        // console.log(todaysQuote + " - " + todaysAuthor);
                        return todaysQuote + " - " + todaysAuthor;
                    })
            
            const printQuote = async () => {
                const quote = await quotes;
                console.log("Quote of the day is: " + quote);
                setQuote(quote);
                //document.getElementById('heading').innerText = a;
                // return "Quote of the day: " + a;
            };
            printQuote();
    },[]);
    



    return (
        <Bg>
            <Welcome className="container">
                <h1 style={{color: "#5c9598"}}>Welcome to <span style={{color: "#e97755"}}>HappyApp!</span></h1>
                <h3>It's great to see you</h3>
                <h5>HappyApp makes it really easy to keep track of anxiety triggers and soothers as they happen</h5>
                <Link to="/logs" className="btn" style={{marginTop: "15px", background: "#5c9598", color: "white"}}>Create log</Link>
            </Welcome>
            {quote && (<Quote><p id="heading" style={{margin: "0"}}>Quote of the Day failed to load - refresh page</p>{quote}</Quote>)}
        </Bg>
    )
    
}

export default LandingPage;