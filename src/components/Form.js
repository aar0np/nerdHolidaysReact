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
				'X-Cassandra-Token': process.env.REACT_APP_ASTRA_DB_TOKEN
			}
		}

		// submit year to endpoint
		axios
			.get('https://' + process.env.REACT_APP_ASTRA_DB_ID + '-' + process.env.REACT_APP_ASTRA_DB_REGION + '.apps.astra.datastax.com/api/rest/v2/keyspaces/live_coding/nerd_holidays/' + this.state.year, config)
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