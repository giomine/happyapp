import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import CreateLogContainer from "./CreateLogContainer";


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

        axios.post('http://localhost:5000/day/add', day)
            .then(res => console.log(res.data));


        window.location = '/';

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
                        <label>Did you identify any triggers today?</label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.anxiety}
                            onChange={this.onChangeAnxiety}
                        />
                    </div>

                    <div className="form-group">
                        <label>What lifted your mood today?</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.smiles}
                            onChange={this.onChangeSmiles}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Daily Log" className="btn btn-primary" />
                    </div>

                </form>
            </CreateLogContainer>
        )
    }
}