import React, { useEffect, useState } from 'react';
import axios from './component/axios';
import Adminlayout from '../layout/Adminlayout';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Food_menu() {
  const [list,setList]=useState([]);// this page main data
  const [cat,setCat]=useState([]);// relational category data. It's used in select box of category
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [selectedfile, setSelectedFile] = useState([]);// image file

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setInputs({
            id:'',
            category_id:'',
            title:'',
            description:'',
            price:'',
            duration:''
        });
        
    setShow(true);
    getCategories();// this is call category to add option in category select box
  }

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async (e) => {
    let res = await axios.get(`food-menu/list.php`)
    setList(res.data);
  }

  const getCategories = async (e) => {
      let res = await axios.get(`categories/list.php`)
      setCat(res.data);
  }

  /* handel image/file */
  const handelFile = (e) => {
    setSelectedFile(e.target.files)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    let datas={
        category_id:e.target.category_id.value,
        title:e.target.title.value,
        description:e.target.description.value,
        price:e.target.price.value,
        duration:e.target.duration.value
    }
    datas ={...inputs, ...datas} // marge two object
   
    const formData = new FormData();
    /* handel image/file */
    for (let i = 0; i < selectedfile.length; i++) {
      formData.append('files[]', selectedfile[i])
    }

    for (const property in datas) {
      formData.append(property, datas[property])
    }

    try{
      let url='';
      if(datas.id!=''){
        url=`courses/update.php`;
      }else{
        url=`courses/add.php`;
      }
     
      let response= await axios.post(url,formData);
     
      if(response.data.error == 1){
        alert(response.data.message)
      }else{
        getDatas();
        handleClose()
      }
    } 
    catch(e){
      console.log(e);
    }
  }
  /* function for edit */
  const showEdit=(e) => {
    getCategories();// this is call category to add option in category select box
    setInputs(e);
    setShow(true);
  }

  const deleteUser = async(id) => {
    let res = await axios.get(`courses/delete.php?id=${id}`);
    getDatas();
  }


  return (
    <Adminlayout>
      <div className='container'>
        <h1>Courses</h1>
        
        <Button variant="primary" onClick={handleShow}>
          Add New
        </Button>
        <table className='mt-5 table table-bordered'>
          <thead>
          <tr>
            <th>#SL</th>
            <th>Category</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {list.length > 0 && list.map((d, key) =>
            <tr key={key}>
              <td className="text-bold-500">{key+1}</td>
              <td>{d.cat_name}</td>
              <td>{d.name}</td>
              <td>{d.description}</td>
              <td>{d.price}</td>
              <td>{d.preparation_time}</td>
              <td><img src={`${process.env.REACT_APP_API_URL}${d.image}`} width="100px"/></td>
              <td>
                  <Button variant="primary" onClick={()=>{showEdit(d)}}>Edit</Button>
                  <Button variant="danger" onClick={()=>{deleteUser(d.id)}}>Delete</Button>
              </td>
            </tr>
          )}
          </tbody>
        </table>


      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className='form-group'>
                  <label htmlFor='category_id'>Category </label>
                  {cat.length > 0 && (
                  <select defaultValue={inputs.category_id} className='form-control' name="category_id" id='category_id'>
                    <option value="">Select Category</option>
                      {cat.map((d, key) =>
                        <option key={d.id} value={d.id}>{d.name}</option>
                      )}
                  </select>
                  )}
              </div>
              <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input type='text' defaultValue={inputs.title} className='form-control' name="title" id='title'/>
              </div>
              <div className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <textarea defaultValue={inputs.description} className='form-control' name="description" id='description'></textarea>
              </div>
              <div className='form-group'>
                  <label htmlFor='price'>Price</label>
                  <input type='text' defaultValue={inputs.price} className='form-control' name="price" id='price'/>
              </div>
              <div className='form-group'>
                  <label htmlFor='duration'>Duration</label>
                  <input type='text' defaultValue={inputs.duration} className='form-control' name="duration" id='duration'/>
              </div>
              <div className='form-group'>
                  <label htmlFor='image'>Photo</label>
                  <input type='file' onChange={handelFile} className='form-control' name='image' id='image'/>
              </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type='submit'>
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      </div>
    </Adminlayout>
    
  );
}


export default Food_menu;
