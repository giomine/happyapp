import React from "react";
import Bg from "./styledcomponents/Bg";
import Quote from "./styledcomponents/Quote";
import Welcome from "./styledcomponents/Welcome";
import { Link } from "react-router-dom";

const quotes = fetch("https://quotes.rest/qod?language=en")
    .then(res => res.json())
    .then(data => {
            var todaysQuote = '"' + data.contents.quotes[0].quote + '"';
            var todaysAuthor = data.contents.quotes[0].author;

            // console.log(todaysQuote + " - " + todaysAuthor);
            return todaysQuote + " - " + todaysAuthor;
        })

const printQuote = async () => {
    const a = await quotes;
    console.log("Quote of the day is: " + a);
    document.getElementById('heading').innerText = a;
    // return "Quote of the day: " + a;
};

printQuote();

function LandingPage() {

    return (
        <Bg>
            <Welcome className="container">
                <h1 style={{color: "#c3d7d3"}}>Welcome to <span style={{color: "#f2b8a7"}}>HappyApp!</span></h1>
                <h3>It's great to see you</h3>
                <h5>HappyApp makes it really easy to keep track of anxiety triggers and soothers as they happen</h5>
                <Link to="/logs" className="btn" style={{marginTop: "15px", background: "#5c9598", color: "white"}}>Create log</Link>
            </Welcome>
            <Quote><p id="heading" style={{margin: "0"}}></p></Quote>
        </Bg>
    )
}

export default LandingPage;