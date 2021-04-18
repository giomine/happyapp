import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import CreateLogContainer from "./styledcomponents/CreateLogContainer";
import Bg from "./styledcomponents/Bg";
import DayContainer from "../components/styledcomponents/DayContainer";
import Quote from "./styledcomponents/Quote";



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
        axios.get('https://mern-happy-app.herokuapp.com/day/' + this.props.match.params.id)
            .then(response => {
                this.setState({ 
                    date: new Date(response.data.date),
                    anxiety: response.data.anxiety,
                    smiles: response.data.smiles
                 })
            })

        axios.get('https://mern-happy-app.herokuapp.com/day/')
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

        axios.put('https://mern-happy-app.herokuapp.com/day/update/' + this.props.match.params.id, day)
            .then(res => console.log(res.data));


        window.location = '/logs';

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
            <Quote><h3 style={{margin: "0"}}>Edit Log</h3></Quote> 
            <br />
            <CreateLogContainer paleBlue>
                {/* <h3>Edit Daily Log</h3> */}
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label>Edit Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Edit Triggers: </label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.anxiety}
                            onChange={this.onChangeAnxiety}
                        />
                    </div>

                    <div className="form-group">
                        <label>Edit Soothers: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.smiles}
                            onChange={this.onChangeSmiles}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit changes" className="btn" style={{marginTop: "15px", background: "#eeb76b", color: "white"}} />
                    </div>

                </form>
            </CreateLogContainer>


            <div className="container">
                <h3 style={{margin: "40px 0 15px 15px", color: "#636360"}}>Daily Logs</h3>
                    <div style={{display: "flex", flexWrap: "wrap"}}>  {/* I can use flexDirection: column-reverse OR find a way to organise by date */}
                        { this.dayList() }
                    </div>
                </div>
            </div>
            </Bg>
        )
    }
}