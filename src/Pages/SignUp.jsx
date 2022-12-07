import InputGroup from "Components/InputGroup";
import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";




function SignUp() {

  const [validated, setValidated] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const appellationRef = useRef();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      register();
    }
    setValidated(true);
  };

  const register = () => {
    fetch("http://localhost:3001/Parents", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current["value"],
        password: passwordRef.current["value"],
        isVerified: false,
        avatar_uid: "100",
        appellation: appellationRef.current["value"],
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then(data => {
        let j = await data.json()
        console.log(j)
      })
      // .then(json => console.log(json))
  }


  return (
    <main className="signup text-center">
      <section className="form">
        <div className="container my-5">
          <div className="row justify-content-center align-items-center">
            <div className="col col-lg-6">
              <h2>Sign Up</h2>
              <p>
                Already have an account? <Link to={"/login"}>Login</Link>
              </p>

              <Form noValidate validated={validated} onSubmit={handleSubmit} className="text-start">
                {/*
                    <InputGroup type="text" label="Email" placeholder="email@domain.com" required pattern={/\w+[\w-.]*@\w+((-\w+)|(\w*))(\.[a-z]{2,3}){1,3}/} pattern_message="Please enter a valid E-mail" />
                    <InputGroup type="password" label="Password" placeholder="********" pattern={/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/} pattern_message="one lower case letter, one upper case letter, one digit, 6-13 length, and no spaces" />
                */}
                <InputGroup type="text" label="Email" placeholder="email@domain.com" required ref={emailRef} />
                <InputGroup type="password" label="Password" placeholder="********" required ref={passwordRef} />
                <InputGroup type="password" label="Confirm Password" placeholder="********" />
                <InputGroup type="text" label="What do you want you kids to call you on Oompa?" placeholder="Daddy" required ref={appellationRef} />

                <div className="text-center my-5">
                  <Button type="submit">Sign Up</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
