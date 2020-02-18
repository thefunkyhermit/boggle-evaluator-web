import React from 'react';
import './App.css';

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response.json();
}

class SubmitBoggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row1: {column1: this.getRandomLetter(), column2: this.getRandomLetter(), column3: this.getRandomLetter(), column4: this.getRandomLetter()},
            row2: {column1: this.getRandomLetter(), column2: this.getRandomLetter(), column3: this.getRandomLetter(), column4: this.getRandomLetter()},
            row3: {column1: this.getRandomLetter(), column2: this.getRandomLetter(), column3: this.getRandomLetter(), column4: this.getRandomLetter()},
            row4: {column1: this.getRandomLetter(), column2: this.getRandomLetter(), column3: this.getRandomLetter(), column4: this.getRandomLetter()},
            wordsMatched: [], spinnerVisibility: "http-loading-hidden", column1Records: [], column2Records: []
        };
    }

    getRandomLetter = () => {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randomNumber = Math.floor(Math.random() * 26);
        let character = characters.substring(randomNumber, randomNumber + 1);
        return character;

    };

    randomizeBoard = (e) => {
        this.setState({
            wordsMatched: [], column1Records: [], column2Records: [],
            row1: {column1: this.getRandomLetter(), column2: this.getRandomLetter(), column3: this.getRandomLetter(), column4: this.getRandomLetter()},
            row2: {column1: this.getRandomLetter(), column2: this.getRandomLetter(), column3: this.getRandomLetter(), column4: this.getRandomLetter()},
            row3: {column1: this.getRandomLetter(), column2: this.getRandomLetter(), column3: this.getRandomLetter(), column4: this.getRandomLetter()},
            row4: {column1: this.getRandomLetter(), column2: this.getRandomLetter(), column3: this.getRandomLetter(), column4: this.getRandomLetter()}
        });
    };

    handleClick = (e) => {
        this.setState({spinnerVisibility: "http-loading-visible", wordsMatched: []});
        let board = {
            "boardLetters": [
                [this.state.row1.column1, this.state.row1.column2, this.state.row1.column3, this.state.row1.column4],
                [this.state.row2.column1, this.state.row2.column2, this.state.row2.column3, this.state.row2.column4],
                [this.state.row3.column1, this.state.row3.column2, this.state.row3.column3, this.state.row3.column4],
                [this.state.row4.column1, this.state.row4.column2, this.state.row4.column3, this.state.row4.column4]
            ]
        };

        postData('http://localhost:8080/evaluations/en', board)
            .then((data) => {
                let numberOfRecords = data.results.length;
                let numColumn1 = Math.ceil(numberOfRecords / 2);
                let firstColumnRecords = data.results.slice(0, numColumn1);
                let secondColumnRecords = data.results.slice(numColumn1, data.results.length);

                this.setState({
                    wordsMatched: data.results,
                    spinnerVisibility: "http-loading-hidden",
                    column1Records: firstColumnRecords,
                    column2Records: secondColumnRecords
                });
            });
    };

    handleLetterChange = (event) => {
        let newValue = event.target.value.toUpperCase();
        if (newValue.length > 1) {
            return;
        }
        if (event.target.id === "1.1") {
            let row = this.state.row1;
            row.column1 = newValue;
            this.setState({row1: row});
        } else if (event.target.id === "1.2") {
            let row = this.state.row1;
            row.column2 = newValue;
            this.setState({row1: row});
        } else if (event.target.id === "1.3") {
            let row = this.state.row1;
            row.column3 = newValue;
            this.setState({row1: row});
        } else if (event.target.id === "1.4") {
            let row = this.state.row1;
            row.column4 = newValue;
            this.setState({row1: row});
        } else if (event.target.id === "2.1") {
            let row = this.state.row2;
            row.column1 = newValue;
            this.setState({row2: row});
        } else if (event.target.id === "2.2") {
            let row = this.state.row2;
            row.column2 = newValue;
            this.setState({row2: row});
        } else if (event.target.id === "2.3") {
            let row = this.state.row2;
            row.column3 = newValue;
            this.setState({row2: row});
        } else if (event.target.id === "2.4") {
            let row = this.state.row2;
            row.column4 = newValue;
            this.setState({row2: row});
        } else if (event.target.id === "3.1") {
            let row = this.state.row3;
            row.column1 = newValue;
            this.setState({row3: row});
        } else if (event.target.id === "3.2") {
            let row = this.state.row3;
            row.column2 = newValue;
            this.setState({row3: row});
        } else if (event.target.id === "3.3") {
            let row = this.state.row3;
            row.column3 = newValue;
            this.setState({row3: row});
        } else if (event.target.id === "3.4") {
            let row = this.state.row3;
            row.column4 = newValue;
            this.setState({row3: row});
        } else if (event.target.id === "4.1") {
            let row = this.state.row4;
            row.column1 = newValue;
            this.setState({row4: row});
        } else if (event.target.id === "4.2") {
            let row = this.state.row4;
            row.column2 = newValue;
            this.setState({row4: row});
        } else if (event.target.id === "4.3") {
            let row = this.state.row4;
            row.column3 = newValue;
            this.setState({row4: row});
        } else if (event.target.id === "4.4") {
            let row = this.state.row4;
            row.column4 = newValue;
            this.setState({row4: row});
        }
    };

    renderRow = (records) => {
        return records.map((word) =>
            <li className="list-group-item" key={word}>
                {word}
            </li>)
    };

    render() {
        const column1 = this.renderRow(this.state.column1Records);
        const column2 = this.renderRow(this.state.column2Records);

        return (
            <div>
                <form>
                    <div className="form-group"></div>
                    <div>
                        <button type="button" className="btn btn-warning" onClick={this.randomizeBoard}>Randomize Board</button>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm"></div>
                            <div className="col-sm"></div>
                            <div className="col-sm">Column 1</div>
                            <div className="col-sm">Column 2</div>
                            <div className="col-sm">Column 3</div>
                            <div className="col-sm">Column 4</div>
                            <div className="col-sm"></div>
                            <div className="col-sm"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm"></div>
                            <div className="col-sm"></div>
                            <div className="col-sm"><input id="1.1" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row1.column1}/></div>
                            <div className="col-sm"><input id="1.2" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row1.column2}/></div>
                            <div className="col-sm"><input id="1.3" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row1.column3}/></div>
                            <div className="col-sm"><input id="1.4" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row1.column4}/></div>
                            <div className="col-sm"></div>
                            <div className="col-sm"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm"></div>
                            <div className="col-sm"></div>
                            <div className="col-sm"><input id="2.1" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row2.column1}/></div>
                            <div className="col-sm"><input id="2.2" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row2.column2}/></div>
                            <div className="col-sm"><input id="2.3" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row2.column3}/></div>
                            <div className="col-sm"><input id="2.4" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row2.column4}/></div>
                            <div className="col-sm"></div>
                            <div className="col-sm"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm"></div>
                            <div className="col-sm"></div>
                            <div className="col-sm"><input id="3.1" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row3.column1}/></div>
                            <div className="col-sm"><input id="3.2" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row3.column2}/></div>
                            <div className="col-sm"><input id="3.3" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row3.column3}/></div>
                            <div className="col-sm"><input id="3.4" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row3.column4}/></div>
                            <div className="col-sm"></div>
                            <div className="col-sm"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm"></div>
                            <div className="col-sm"></div>
                            <div className="col-sm"><input id="4.1" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row4.column1}/></div>
                            <div className="col-sm"><input id="4.2" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row4.column2}/></div>
                            <div className="col-sm"><input id="4.3" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row4.column3}/></div>
                            <div className="col-sm"><input id="4.4" className="boggle-letter-input" type="text" onChange={this.handleLetterChange} value={this.state.row4.column4}/></div>
                            <div className="col-sm"></div>
                            <div className="col-sm"></div>
                        </div>
                    </div>
                    <div className="separator"/>
                    <button type="button" className="btn btn-primary" onClick={this.handleClick}>Upload Boggle Board</button>
                    <small id="boggleBoardHelp" className="form-text text-muted">Input your board in the form.</small>
                </form>
                <div className="separator"/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <div>Words Matched: {this.state.wordsMatched.length}</div>
                            <div className={this.state.spinnerVisibility}>
                                <div className="spinner-grow" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            <ul className="list-group">
                                                {column1}</ul>

                                        </div>
                                        <div className="col-sm">
                                            <ul className="list-group">
                                                {column2}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}


function App() {
    return (
        <div className="App">
            <div className="container">
                <h1>Boggle Evaluator</h1><SubmitBoggle/>
            </div>
        </div>
    );
}

export default App;
