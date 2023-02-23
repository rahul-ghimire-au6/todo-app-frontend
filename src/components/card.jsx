import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './cardStyle.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function BasicCard({title,description,isCompleted,deleteTodo,id,toggleTodo,editTodo}) {
  return (
    <Card className='cardContainer' variant="outlined" >
      <CardContent>
        <div className='headerDiv'>
            <div className='headerSubDiv'>
                <div><input className='checkBox' type="checkbox" checked={isCompleted} onChange={e=>toggleTodo(e,id)}/></div>
                <div className='titleDiv'>{title}</div>
            </div>
            <div className='iconDiv'>
            <div className='EditIcon'  onClick={e=>editTodo(e,id)}><EditIcon/></div>
            <div className='deleteIcon'  onClick={e=>deleteTodo(e,id)}><DeleteIcon/></div>
            </div>
            
        </div>
        <div>   
            <p>{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}