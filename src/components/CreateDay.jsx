import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import CreateLogContainer from "./styledcomponents/CreateLogContainer";


export default class CreateDay extends Component {

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
    }


    // componentDidMount() {
    //     axios.get('http://localhost:5000/day')
    //         .then(response => {
    //             this.setState({ days: response.data })
    //         })
    //         .catch((err) => console.log(err));
    // }


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

        axios.post('/day/add', day)
            .then(res => console.log(res.data));


        window.location = '/logs';

    }


    

    
    render() {
        return (
            <CreateLogContainer>
                {/* <h3>Create New Daily Log</h3> */}
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
                            placeholder="Did you identify any triggers today?"
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
                            placeholder="What lifted your mood today?"
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create" className="btn" style={{marginTop: "15px", background: "#5c9598", color: "white"}} />
                    </div>

                </form>
            </CreateLogContainer>
        )
    }
}