import React from "react";
import { Alert } from "reactstrap";
import { Redirect } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";

import { Button } from "./Button";
import { Input } from "./Input";
import { useState } from "../state";
import { useSubmitOnEnter } from "../helpers";

export const Signup = () => {
  const [state] = useState();

  if (state.user) {
    return <Redirect to="/products" />;
  }

  const [form, setForm] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { disabled, loading, error, onSubmit } = useSignup(form);

  useSubmitOnEnter(onSubmit);

  return (
    <div>
      <div className="mx-auto bg-white shadow-sm w-1/4 p-14 mt-40">
        <div className="mb-6 text-center text-xl">User Registration</div>

        <Input
          className="mb-6"
          placeholder="Username"
          value={form.username}
          icon={faUser}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <Input
          className="mb-6"
          placeholder="Password"
          value={form.password}
          type="password"
          icon={faKey}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Input
          className="mb-6"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          type="password"
          icon={faKey}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <div className="text-center">
          <Button
            color="success"
            className="m-auto"
            disabled={disabled}
            loading={loading}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
        </div>
      </div>

      {error && error.message && (
        <div className="mx-auto w-1/4 mt-6">
          <Alert color="danger">{error.message}</Alert>
        </div>
      )}
    </div>
  );
};

/**
 * HOOKS
 */

const SignUpMutation = gql`
  mutation SignUp(
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
    }
  }
`;

function useSignup(form) {
  const [_, dispatch] = useState();
  const [doMutation, { loading, error }] = useMutation(SignUpMutation);

  const disabled = React.useMemo(
    () => !form.username || !form.password || !form.confirmPassword,
    [form, loading]
  );

  const onSubmit = React.useCallback(async () => {
    const res = await doMutation({ variables: form });
    if (res.data && res.data.signup && res.data.signup.token) {
      dispatch({ type: "SET_JWT", token: res.data.signup.token });
    }
  }, [form]);

  return {
    disabled,
    error,
    loading,
    onSubmit,
  };
}
