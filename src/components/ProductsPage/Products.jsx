import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useQuery } from 'react-query';
import { agent, BASE_URL } from '../../api/agent';
import { useForm } from "react-hook-form";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Products() {
   const [post, setPost]=useState([])

  //  ______________________Modal___________________

   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
//  __________________DataFetch______________________

const {data, isLoading,refetch}=useQuery(
  "products",
  async ()=>{
    return agent.getAll(BASE_URL)
    .then(res=>setPost(res))
  }
)
// ____________________DataDelete_____________________
const handleDelete=(item)=>{
  agent.getByDelete(BASE_URL,item)
  .then(()=>{
    refetch()

  })

}

// __________________ProductAddd______________________

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
const onSubmit = (data) => {
  alert(JSON.stringify(data))
  console.log(data);

  agent.getByPost(BASE_URL,data)
  .then(()=>{
    refetch()
  })
};



  return (
    <>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Add</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Update</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {post.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price} m</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right"><button onClick={handleOpen}>Add</button></TableCell>
              <TableCell align="right"><button onClick={()=>handleDelete(row._id)}>Delete</button></TableCell>
              <TableCell align="right"><button>Updata</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* __________________Add_Modal_____________________ */}

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Add
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)} className="seans_minidiv">
     
     <input 
     type="text" 
     placeholder="Products Name" 
     {...register("name", { required:'*Zehmet olmasa xanani doldurun.' })}
     />
    <p> {errors.text && <span>{errors.text.message}</span>}</p>
     <input type="number" name="Product Price" placeholder="product Price"  {...register("price", { required:'*Zehmet olmasa xanani doldurun.' })} />
     <p> {errors.number && <span>{errors.number.message}</span>}</p>
     <textarea placeholder="Product Description" type="text"   {...register("description", { required:'*Zehmet olmasa xanani doldurun.' })} />
     <p> {errors.text && <span>{errors.text.message}</span>}</p>

  
     <div className="add">
       <input type="submit" value="Submit" />
     </div>
   </form>
          </Typography>
        </Box>
      </Modal>

    </>
  )
}

export default Products