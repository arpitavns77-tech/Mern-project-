import React from 'react'
import axios from 'axios'
import { Table } from "flowbite-react";
import {
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import { toast, ToastContainer } from 'react-toastify';

export function EnquiryList({data,getAllenquiry,Swal,setFormData}){

  let deleteRow=(delid)=>{

    Swal.fire({
      title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  
   }).then((result) => {
  
  if (result.isConfirmed)
  {
    axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
      .then(()=>{
        toast.success('enquiry delete succesfully')
        getAllenquiry()
      })
  
     Swal.fire("Saved!", "", "success");
     }
  else if (result.isDenied) Swal.fire("Changes are not saved", "", "info");
});

    
  }

  let editRow=(editid)=>{
    axios.get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
    .then((res)=>{
      let data = res.data
      setFormData(data.enquiry)

    })

  }
    
  return (
       <div className='bg-gray-200 p-4'>
       <ToastContainer/>
              <h2 className='text-[20px] font-bold mb-4'>Enquiry List</h2>
              <div className="overflow-x-auto ">
      <Table>
        <TableHead>
            <TableHeadCell>Sr No</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>phone</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>
              <span>DELETE</span>
            </TableHeadCell>
            <TableHeadCell>
              <span>EDIT</span>
            </TableHeadCell>

        </TableHead>
        <TableBody className="divide-y">
          {
            data.length>=1 ?
            data.map((item,index)=>{
              return(
                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.message}</TableCell>
                  <TableCell>
                    <button onClick={()=> deleteRow(item._id)} className='bg-red-400 text-white px-4 py-2 rounded-md'>Delete</button>
                  </TableCell>
                  <TableCell>
                    <button onClick={()=> editRow(item._id)} className='bg-red-400 text-white px-4 py-2 rounded-md'>Edit</button>
                  </TableCell>
                </TableRow>

              )
            })
            :
            <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <TableCell colSpan={7} className='text-center'> No Data Found</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </div>
          </div>
  )
}