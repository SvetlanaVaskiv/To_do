import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { uuid } from 'uuidv4';
import { NoteItem } from "../NoteItem/NoteItem";

export const NoteList = () => {
	const [list, setList] = useState([]);
	const [value, setValue] = useState('')
	const handleChange = (e) => setValue(e.target.value)
	const onSave = () => {
		const data = {
			name: value,
			id: uuid(),
			completed: false,
			date: new Date().toLocaleString(),
		}
		setList((prevState) => [...prevState, data])

		setValue('')
	}
	const onDelete = (id) => {
		const newList = list.filter(item => item.id !== id)
		setList(newList);
	}
	const onUpdate = (id, text) => {
		const newList = list.map(item => item.id === id ? { ...item, name: text } : item)
		setList(newList);

	}
	const onCompleted = (id, completed) => {
		const newList = list.map(item => item.id === id ? { ...item, completed: !completed } : item)
		setList(newList);

	}


	const [filter, setFilter] = useState('')
	const handleChangeFilter = (e) => setFilter(e.target.value);
	const visibleList = list.filter(item => item.name.includes(filter))
	return (
		<div style={{ width: 700, margin: '0 auto' }}>
			<TextField fullWidth label="Search note" variant="outlined" value={filter} onChange={handleChangeFilter} placeholder='Your Note' />
			<div style={{ padding: 50 }}>
				<Box component='from'>
					<TextField fullWidth label="Name of the  note" variant="outlined" value={value} onChange={handleChange} placeholder='Your Note' />
					<Button disabled={value.length < 1} fullWidth variant='contained' onClick={onSave}>Save</Button>
				</Box>

			</div>
			{
				visibleList && visibleList.map(item => <NoteItem
					onDelete={onDelete}
					onUpdate={onUpdate}
					name={item.name}
					id={item.id}
					completed={item.completed}
					onCompleted={onCompleted}
					key={item.id} />)
			}
		</div>
	)
}