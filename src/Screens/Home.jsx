import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [show, setShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            age: 0,
            country: '',
            position: '',
            wage: 0,
        }
    });

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const employeeFormSubmit = (values) => {
        axios.post('http://localhost:3001/create',
            {
                name: values.name,
                age: values.age,
                country: values.country,
                position: values.position,
                wage: values.wage
            })
            .then(() => {
                setAlertMessage('Employee added successfully.')
                setTimeout(() => setAlertMessage(''), 3000)
            })
            .catch((err) => {
                console.log(err);
            })
        
        reset()
    }

    return (
        <div className='container py-5'>
            <div className="col-md-8 mx-auto">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className='fw-bold'>Employee management system.</h4>
                    <button className="btn btn-dark px-4 py-2" onClick={handleShow}>
                        Add employee
                    </button>
                </div>
                <div className="text-center py-4">
                    <h6 className="text-center">Employee list</h6>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Country</th>
                                <th>Position</th>
                                <th>Wage</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.id == undefined ? (
                                <tr>
                                    <td colSpan={7} className="text-center">Loading...</td>
                                </tr>
                            ) : employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.country}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.wage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add employee modal */}

            {show && (
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="p-5">
                            {alertMessage !== '' && (
                                <h4 className="text-center py-3 text-success">{alertMessage}</h4>
                            )}
                            <h1 className='fw-bold mb-3'>Add Employees</h1>
                            <form onSubmit={handleSubmit(employeeFormSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" className="form-control" id="name" {...register("name", { required: true })} />
                                    <span className="text-danger form-text">
                                        {errors.name?.type === 'required' && "First name is required"}
                                    </span>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="age">Age</label>
                                    <input type="number" name="age" className="form-control" id="age" {...register("age", { required: true, min: 18, max: 60 })} />
                                    <span className="text-danger form-text">
                                        {errors.age?.type === 'required' && "First name is required"}
                                        {errors.age?.type === 'min' && "Age must be 18 or above"}
                                    </span>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" name="country" className="form-control" id="country" {...register("country", { required: true })} />
                                    <span className="text-danger form-text">
                                        {errors.country?.type === 'required' && "First name is required"}
                                    </span>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="position">Position</label>
                                    <input type="text" name="position" className="form-control" id="position" {...register("position", { required: true })} />
                                    <span className="text-danger form-text">
                                        {errors.position?.type === 'required' && "First name is required"}
                                    </span>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="wage">Wage</label>
                                    <input type="number" name="wage" className="form-control" id="wage" {...register("wage", { required: true, min: 5000 })} />
                                    <span className="text-danger form-text">
                                        {errors.wage?.type === 'required' && "First name is required"}
                                        {errors.wage?.type === 'min' && "Wage must be 5000 or above"}
                                    </span>
                                </div>
                                <div className="form-group mt-3">
                                    <button className="btn py-3 w-100 btn-dark bg-gradient">
                                        Add Employee
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        {/* <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            )}

        </div>
    )
}

export default Home