import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import CreateLogContainer from "./styledcomponents/CreateLogContainer";
import Bg from "./styledcomponents/Bg";
import DayContainer from "../components/styledcomponents/DayContainer";


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



export default class EditDay extends Component {

    constructor(props){
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeAnxiety = this.onChangeAnxiety.bind(this);
        this.onChangeSmiles = this.onChangeSmiles.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            date: new Date(),
            anxiety: "",
            smiles: ""
        }

        this.state = {days: []};
    }


    componentDidMount() {
        axios.get('http://localhost:5000/day/' + this.props.match.params.id)
            .then(response => {
                this.setState({ 
                    date: new Date(response.data.date),
                    anxiety: response.data.anxiety,
                    smiles: response.data.smiles
                 })
            })

        axios.get('http://localhost:5000/day/')
        .then(response => {
            this.setState({ days: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }


    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    onChangeAnxiety(e) {
        this.setState({
            anxiety: e.target.value
        });
    }
    onChangeSmiles(e) {
        this.setState({
            smiles: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const day = {
            date: this.state.date,
            anxiety: this.state.anxiety,
            smiles: this.state.smiles
        }
        console.log(day);

        axios.put('http://localhost:5000/day/update/' + this.props.match.params.id, day)
            .then(res => console.log(res.data));


        window.location = '/';

    }



    

    dayList() {
        const Day = props => (
            <DayContainer>
                <div style={{padding: "10px", width: "170px" }}>{props.day.date.substring(0,10)}</div>
                <div style={{padding: "10px" }}><b><span style={{fontSize: "18px"}}>Triggers: </span></b><br /> {props.day.anxiety}</div>
                <div style={{padding: "10px"}}><b><span style={{fontSize: "18px"}}>Soothers: </span></b><br /> {props.day.smiles}</div>
                <div style={{padding: "10px"}}>
                    {/* <Link to={"/edit/" + props.day._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDay(props.day._id) }}>delete</a> */}
                </div>
            </DayContainer>
        )
        return this.state.days.map(currentDay => {
            return <Day day={currentDay} key={currentDay._id} />
        })
    }

    


    
    render() {
        return (
            <Bg>
            <div className="container">
            <i><p id="heading" style={{textAlign: "center", paddingTop: "25px"}}></p></i>
            <br />
            <CreateLogContainer className="bg-info">
                {/* <h3>Edit Daily Log</h3> */}
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Triggers: </label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.anxiety}
                            onChange={this.onChangeAnxiety}
                        />
                    </div>

                    <div className="form-group">
                        <label>Soothers: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.smiles}
                            onChange={this.onChangeSmiles}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit changes" className="btn btn-primary" style={{marginTop: "15px"}} />
                    </div>

                </form>
            </CreateLogContainer>


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