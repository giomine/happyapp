import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateDay from "./CreateDay";
import DayContainer from "./styledcomponents/DayContainer";
import Bg from "./styledcomponents/Bg";

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


const Day = props => (
        <DayContainer>
            <div style={{padding: "10px", width: "170px" }}>{props.day.date.substring(0,10)}</div>
            <div style={{padding: "10px" }}><b><span style={{fontSize: "18px"}}>Triggers: </span></b><br /> {props.day.anxiety}</div>
            <div style={{padding: "10px"}}><b><span style={{fontSize: "18px"}}>Soothers: </span></b><br /> {props.day.smiles}</div>
            <div style={{padding: "10px"}}>
                <Link to={"/edit/" + props.day._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDay(props.day._id) }}>delete</a>
            </div>
        </DayContainer>
)


export default class DayList extends Component {

    constructor(props){
        super(props);

        this.deleteDay = this.deleteDay.bind(this);

        this.state = {days: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/day/')
            .then(response => {
                this.setState({ days: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteDay(id) {
        axios.delete('http://localhost:5000/day/' + id)
            .then(res => console.log(res.data));
        this.setState({
            days: this.state.days.filter(el => el._id !== id)
        })
    }

    dayList() {
        return this.state.days.map(currentDay => {
            return <Day day={currentDay} deleteDay={this.deleteDay} key={currentDay._id} />
        })
    }


    render() {
        return (
            <Bg>
            <div className="container">
                <i><p id="heading" style={{textAlign: "center", paddingTop: "40px"}}></p></i>
                <br />
                <CreateDay />

                <div className="container">
                <h3 style={{margin: "40px 0 15px 15px"}}>Daily Logs</h3>
                    <div style={{display: "flex", flexWrap: "wrap"}}>  {/* I can use flexDirection: column-reverse OR find a way to organise by date */}
                        { this.dayList() }
                    </div>
                </div>
            </div>
            </Bg>
        )
    }
}