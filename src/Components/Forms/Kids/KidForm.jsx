import React, { useState, useRef, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'Components/InputGroup';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from 'App';

const KidForm = ({ kid }) => {
    const [validated, setValidated] = useState(false);
    const [dbError, setDbError] = useState(null) // For the alert in case of an error
    const [password, setPassword] = useState(null)
    const [busy, setBusy] = useState(false) // Busy if already sent a request to register

    const [user, setUser] = useContext(userContext);
    const navigate = useNavigate()

    const usernameRef = useRef()
    const passwordRef = useRef()
    const first_nameRef = useRef()
    const avatarRef = useRef()

    useEffect(() => {
        if (user.type !== "parent")
            navigate("/")
    }, [navigate, user.type])

    const process = () => {
        setBusy(true)
        fetch("http://localhost:3001/kids", {
            method: kid ? "PUT" : "POST",
            body: JSON.stringify({
                parent_uid: user.id,
                username: usernameRef.current['value'],
                password: passwordRef.current['value'],
                first_name: first_nameRef.current['value'],
                avatar: avatarRef.current['value'],
                points: 0
            }),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
            },
        })
            .then(data => data.json())
            .then(json => {
                setBusy(false)
                console.log(json)
                if (json.success) {
                    console.log(json)
                    navigate('/dashboard/kids')
                } else {
                    setDbError(json.msg)
                }
            })
            .catch(err => {
                console.log('error', err)
                setBusy(false)
            })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true && !busy) {
            process();
        }
        setValidated(true);
    };


    return (
        <div className="container">
            <div className='form'>
                <div className="text-center my-5">
                    <h1>{kid ? `Edit ${kid.username}` : "Add a kid"}</h1>
                    <h3>{kid ? "Make sure to confirm the password with them!" : ""}</h3>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <InputGroup type="text" label="Username" placeholder="Username" required ref={usernameRef} />
                    <InputGroup type="password" label="Password" placeholder="********" required ref={passwordRef} clear_error={setDbError} set_password={setPassword} />
                    <InputGroup type="password" label="Confirm Password" placeholder="********" required clear_error={setDbError} password={password} />
                    <InputGroup type="text" label="Name" placeholder="Timmy" required ref={first_nameRef} />
                    {/* TODO: AVATAR */}
                    <InputGroup type="text" label="Avatar" placeholder="Link to the avatar" required ref={avatarRef} />

                    {dbError && <p className="alert alert-danger text-center">{dbError}</p>}

                    <div className='text-center d-flex justify-content-center gap-5'>
                        <Button type="submit" >{kid ? "Save" : "Create"}</Button>
                        <Button as={NavLink} to={"/dashboard/kids"} className="btn-danger">Cancel</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default KidForm;