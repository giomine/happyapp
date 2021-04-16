import React, { Component } from "react";
import axios from 'axios';
import CreateDay from "./CreateDay";
import DayContainer from "./styledcomponents/DayContainer";
import Bg from "./styledcomponents/Bg";
import Quote from "./styledcomponents/Quote";

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
                {/* <Link to={"/edit/" + props.day._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDay(props.day._id) }}>delete</a> */}
                <a href={"/edit/" + props.day._id}>edit</a> | <a href="#" onClick={() => { props.deleteDay(props.day._id) }}>delete</a>
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


        const sorted = this.state.days
        // const sorted = this.state.days.sort((a,b) => a.date > b.date) this doesn't sort anything
        // console.log("Old " + JSON.stringify(sorted))   this prints out all full daily log objects
        // const sortedDays = sorted.reverse()  this does nothing atm
        
        function sortDates(){

            let dateArray = []

            for (let i = 0; i < sorted.length; i++) {
                const dates = sorted[i].date
                // console.log("All dates: " + dates) // this gives us all the dates but not sorted

                dateArray.push(dates)
            }

            console.log("Date Array: " + dateArray) // this gives us all the dates in an array but not sorted

            let sortedAllDates = dateArray.sort()
            console.log("Sorted All Dates: " + sortedAllDates) // this gives us all the dates in an array, sorted from oldest to most recent

            let reverseAllDates = sortedAllDates.reverse()
            console.log("Reversed Dates: " + reverseAllDates)  // THIS is the one we want mapped
        }

        sortDates();

        return sorted.map(currentDay => {
            // console.log("Hello " + this.state.days[15].date)      These lines print one specific instance of date and anxiety
            // console.log("Hello Hello " + sortedDays[15].anxiety)

            // for (let i = 0; i < sorted.length; i++) {
            //     const dates = sorted[i].date
            //     console.log("POOP! " + dates)  this gives us the dates but not sorted AND SIXTEEN TIMES
            //     }


            let dateArray = []
            dateArray.push(currentDay.date)
            let sortedAllDates = dateArray.sort()
            let reverseAllDates = sortedAllDates.reverse()
            console.log("Forever: " + reverseAllDates) // shows all objects in default order... and not in single array because map is looping. so we have 6 arrays, that's why it can't sort them.
            
            return <Day day={currentDay} deleteDay={this.deleteDay} key={currentDay._id} />
        })


    }


    render() {
        return (
            <Bg>
            <div className="container">
                <Quote><p id="heading"></p></Quote>
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