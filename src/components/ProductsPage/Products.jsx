import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useQuery } from "react-query";
import { agent, BASE_URL } from "../../api/agent";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Products() {
  const [post, setPost] = useState([]);

  //  ______________________Modal___________________

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [update, setUpdate] = React.useState({
    id:undefined,
    name: "",
    price: "",
    description: "",
  });
  const handleOpen = () => setOpen(true);
  const handleOpen1 = () => setOpen1(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  //  __________________DataFetch______________________

  const { data, isLoading, refetch } = useQuery("products", async () => {
    return agent.getAll(BASE_URL).then((res) => setPost(res));
  });
  // ____________________DataDelete_____________________
  const handleDelete = (item) => {
    agent.getByDelete(BASE_URL, item).then(() => {
      refetch();
    });
  };

  // __________________ProductAddd______________________

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    console.log(data);

    agent.getByPost(BASE_URL, data).then(() => {
      reset({});
      handleClose();
      refetch();
    });
  };

  const openUpdate = (item) => {
    // let id = item._id;
    // console.log(id);
    handleOpen1();
    // console.log(id, update)
    setUpdate({
      id:item._id,
      name:item.name,
      price:item.price,
      description:item.description
    })
    // agent.getById(BASE_URL, id).then((res) => {
    //   console.log(res);


    // });
    // console.log(item._id);
  };

  const handleUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setUpdate({
      ...update,
      [name]:value
  })
  };
  console.log(update);

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
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price} m</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <button onClick={handleOpen}>Add</button>
                </TableCell>
                <TableCell align="right">
                  <button onClick={() => handleDelete(row._id)}>Delete</button>
                </TableCell>
                <TableCell align="right">
                  <button onClick={() => openUpdate(row)}>Updata</button>
                </TableCell>
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
                {...register("name", {
                  required: "*Zehmet olmasa xanani doldurun.",
                })}
              />
              <p> {errors.text && <span>{errors.text.message}</span>}</p>
              <input
                type="number"
                name="Product Price"
                placeholder="product Price"
                {...register("price", {
                  required: "*Zehmet olmasa xanani doldurun.",
                })}
              />
              <p> {errors.number && <span>{errors.number.message}</span>}</p>
              <textarea
                placeholder="Product Description"
                type="text"
                {...register("description", {
                  required: "*Zehmet olmasa xanani doldurun.",
                })}
              />
              <p> {errors.text && <span>{errors.text.message}</span>}</p>

              <div className="add">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>


      {/* _______________Update_Model__________________ */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Updata
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           {update && (
              <form className="seans_minidiv">
              <input
                type="text"
                placeholder="Products Name"
                name="name"
                value={update.name}
                onChange={handleUpdate}
                // {...register("name", {
                //   required: "*Zehmet olmasa xanani doldurun.",
                // })}
              />
              {/* <p> {errors.text && <span>{errors.text.message}</span>}</p> */}
              <input
                type="number"
                name="price"
                placeholder="product Price"
                value={update.price}
                onChange={handleUpdate}

                // {...register("price", {
                //   required: "*Zehmet olmasa xanani doldurun.",
                // })}
              />
              {/* <p> {errors.number && <span>{errors.number.message}</span>}</p> */}
              <textarea
                placeholder="Product Description"
                type="text"
                name="description"
                value={update.description}
                onChange={handleUpdate}

                // {...register("description", {
                //   required: "*Zehmet olmasa xanani doldurun.",
                // })}
              />
              {/* <p> {errors.text && <span>{errors.text.message}</span>}</p> */}

              <div className="add">
                <input type="submit" value="Submit" />
              </div>
            </form>

           )}
          
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Products;
