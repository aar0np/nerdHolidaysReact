import React, { useState, useEffect, Component } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import axios from 'axios'

class Form extends Component {

	constructor(props) {
		super(props)

		this.state = {
			year: '',
			eventdata: []
		}
	}

	handleYearChange = event => {
		this.setState({
			year: event.target.value
		})
	}

	handleSubmit = event => {
		event.preventDefault()

		let config = {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-Cassandra-Token': 'AstraCS:SaAhbKerPiSCjuSmhbYzIPtf:442b15c1fedf430ffcc909ceea10a42e53d7bf7c179469614b1b69c1791fd6da'
			}
		}

		// submit year to endpoint
		axios
			.get('https://f3a624eb-5e69-40d1-928a-58a84581368f-us-east1.apps.astra.datastax.com/api/rest/v2/keyspaces/live_coding/nerd_holidays/' + this.state.year, config)
			.then(response => {
				this.setState({eventdata: response.data.data})
				console.log(this.state.eventdata)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const columns: GridColDef[] = [
		  { field: 'id', headerName: 'id', width: 100 },
		  { field: 'name', headerName: 'Name', width: 250 },
		  { field: 'event_date', headerName: 'Event Date', width: 100 }
		];

		return (
			<div align='center'>
				<form onSubmit={this.handleSubmit}>
					<div>
						<h1 className='title'>Nerd Holiday viewer</h1>
						<label className='label'>Year</label>
						<input type='text'
							   value={this.state.year}
							   onChange={this.handleYearChange} />
					</div>
					<button type="submit">Query</button>
				</form>
				<br/>
			    <div style={{ height: 600, width: '40%' }}>
      				<DataGrid
      					rows={this.state.eventdata}
      					columns={columns}
      					id='id'
      				 />
    			</div>
			</div>
		)
	}
}

export default Form