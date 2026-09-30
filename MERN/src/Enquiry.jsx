  import React, { useEffect, useState } from 'react'
  import 'react-toastify/dist/ReactToastify.css';
  import './index.css'
  import axios from 'axios';
  import { Button, Checkbox, Label, TextInput,Textarea } from "flowbite-react";
  import { ToastContainer, toast } from 'react-toastify';

  import { EnquiryList } from './enquiry/EnquiryList';
  import Swal from 'sweetalert2/dist/sweetalert2.js'

  const Enquiry = () => {
    let [enquiryList, setEnquiryList] = useState([])
    let [formData, setFormData] = useState({
      name:'',
      email:'',
      phone:'',
      message:'',
      _id:''
    })

      let saveEnquiry =(e)=>{
      e.preventDefault()
      let formData={
        name:e.target.name.value,
        email:e.target.email.value,
        phone:e.target.phone.value,
        message:e.target.message.value
      }

      axios.post(
  "http://localhost:8020/api/website/enquiry/insert",
  formData
)
.then((res)=>{
  console.log("Success:", res.data);
  toast.success('enquiry saved Successfully')

  // if(res.data.status){
  //   toast.success(res.data.message);
  //   getAllenquiry();
  // }else{
  //   toast.error(res.data.message);
  //   console.log(res.data.error);
  // }
})
.catch((err)=>{
  console.log("API ERROR:", err);
  
    setFormData({
      name:'',
      email:'',
      phone:'',
      message:''
    })
    getAllenquiry()
  }) 
  }

  let getAllenquiry = ()=>{
    axios.get('http://localhost:8020/api/website/enquiry/view')
    .then((res)=>{
      return res.data
    })
    .then((finalData)=>{
      if(finalData.status){
        setEnquiryList(finalData.enquiryList)
      }
    })
  }
  
      let getValue=(e)=>{
        let inputName = e.target.name
        let inputValue = e.target.value
        let oldData = {...formData}
      
        oldData[inputName]=inputValue;
        setFormData(oldData)
      }
    
      useEffect(()=>{
        getAllenquiry()
      },[])
      
    return (
      
      <div>
      <ToastContainer/>
        <h1 className='text-[40px] font-bold text-center py-6 '>User Enquiry</h1>

        <div className='grid grid-cols-[30%_auto] gap-10'>
          <div className='bg-gray-200 p-4'>
              <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
              <form action="" onSubmit={saveEnquiry}>
                  <div className='py-3'>
                      <Label htmlFor="name" value="Your Name"/>
                      <TextInput  value={formData.name} onChange={getValue}  type="text" name="name" placeholder="Enter your Name" required />
                  </div>
                  <div className='py-3'>
                      <Label  htmlFor="email" value="Your email"/>
                      <TextInput value={formData.email} onChange={getValue} name="email" placeholder="Enter your email" required />
                  </div>
                  <div className='py-3'>
                      <Label htmlFor="phone" value="Your phone"/>
                      <TextInput type="text" value={formData.phone} onChange={getValue} name="phone" placeholder="Enter your phone" required />
                  </div>
                  <div>
                      <Label htmlFor="message" value="Your message"/>
                      <Textarea value={formData.message} onChange={getValue} name="message" placeholder="Massage..." required rows={4} />
                  </div>
                  <div className='py-3'>
                      <Button className='w-[100%] bg-sky-900'  type="submit">Save</Button>
                  </div>
              </form>
          </div>
        
        <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} Swal={Swal} setFormData={setFormData} />
        </div>
      </div>
      
    )
  }
  export default Enquiry
