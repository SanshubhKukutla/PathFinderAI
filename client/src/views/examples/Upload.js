/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
  
  const Upload = () => {

    const [ file,setFile ] = useState()
    
    function handleFile(event) {
        setFile(event.target.files[0])
        //console.log(event.target.files[0])
    }

    function handleUpload(event){
        const formData = new FormData()
        formData.append('file',file)
        fetch(
            'url',
            {
                method: 'POST',
                body: formData
            }
        ).then((response) => response.json().then(
            (result) =>{
                console.log('success', result)
            }
        )
        .catch(error => {
            console.error("Error:", error)
        })
        )
    }
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5"> 
              {/*<div className="text-muted text-center mt-2 mb-4">
                <small>Drag and drop</small>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or browse files</small>
              </div>*/}
              <div className="text-center">
                <form onSubmit={handleUpload}>
                    {/* <input type="file" name="file" onChange={handleFile} /> */}
                    <input   
                    style={{
                        backgroundColor: '#118fef',
                        color: '#ffffff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    name="file"  
                    onChange={handleFile}
                    type="file"/> 
                    <Button variant="contained">Upload</Button>
                </form>
              </div>
              <Form role="form">
                <div className="text-center">
                  <Button className="mt-4" color="default" type="button" href="/admin/dashboard">
                    Continue
                  </Button>
                </div>
              </Form>
            {/* </CardBody> */}
            </CardHeader>
          </Card>
        </Col>
      </>
    );
  };
  
  export default Upload;
  