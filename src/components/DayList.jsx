import React, { Component } from "react";
import CreateDay from "./CreateDay";
import axios from 'axios';
import DayContainer from "./DayContainer";

const quotes = fetch("https://quotes.rest/qod?language=en")
    .then(res => res.json())
    .then(data => {
            var todaysQuote = data.contents.quotes[0].quote;
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


const Day = props => (
        <DayContainer>
            <div style={{padding: "10px"}}>{props.day.date.substring(0,10)}</div>
            <div style={{padding: "10px"}}>Triggers: {props.day.anxiety}</div>
            <div style={{padding: "10px"}}>Soothers: {props.day.smiles}</div>
        </DayContainer>
)


export default class DayList extends Component {

    constructor(props){
        super(props);

        this.state = {days: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/day')
            .then(response => {
                this.setState({ days: response.data })
            })
            .catch((err) => console.log(err));
    }

    dayList() {
        return this.state.days.map(currentDay => {
            return <Day day={currentDay} key={currentDay._id} />
        })
    }


    render() {
        return (
            <div className="container">
                <i><p id="heading" style={{textAlign: "center"}}></p></i>
                <br />
                <CreateDay />

                <div className="container">
                <h3 style={{marginLeft: "15px"}}>Daily Logs</h3>
                    <div style={{display: "flex", flexWrap: "wrap"}}>  {/* I can use flexDirection: column-reverse OR find a way to organise by date */}
                        { this.dayList() }
                    </div>
                </div>
            </div>
        )
    }
}