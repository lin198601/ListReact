import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import Roles from "./Roles";

export interface IValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  roles: number;
}

export interface IFormState {
  [key: string]: any;
  // values: IValues[keyof IValues];
  submitSuccess: boolean;
  loading: boolean;
  isViewError: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      roles: 0,
      // values: new Array<IValues>(),
      loading: false,
      submitSuccess: false,
      isViewError: false,
    };
    this.handleInputChanges = this.handleInputChanges.bind(this);
    this.handleCheackChanges = this.handleCheackChanges.bind(this);
  }

  private processFormSubmission = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    const formData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      description: this.state.description,
      roles: this.state.roles,
    };
    let _isViewError = false;
    if (!this.state.email || !this.state.first_name) {
      _isViewError = true;
    }
    this.setState({
      isViewError: _isViewError,
      submitSuccess: !_isViewError,
    });
    if (!_isViewError) {
      this.setState({ loading: true });
      axios.post(`http://localhost:5000/users`, formData).then((data) => [
        setTimeout(() => {
          this.props.history.push("/");
        }, 1500),
      ]);
    }
  };

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  public handleCheackChanges = (roles: number) => {
    this.setState({ roles: roles });
  };

  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div className="App">
        <div className={"col-md-12 form-wrapper"}>
          <h2> Create Post </h2>
          {!submitSuccess && (
            <div className="alert alert-info" role="alert">
              Fill the form below to create a new post
            </div>
          )}

          {submitSuccess && (
            <div className="alert alert-info" role="alert">
              The form was successfully submitted!
            </div>
          )}

          <form
            id={"create-post-form"}
            onSubmit={this.processFormSubmission}
            noValidate={false}
          >
            <div
              className={`form-group ${
                this.state.isViewError ? "has-error" : ""
              } col-md-12`}
            >
              <label htmlFor="first_name"> First Name </label>
              {this.state.isViewError ? (
                <label className="control-label" htmlFor="first_name">
                  *
                </label>
              ) : (
                <></>
              )}
              <input
                type="text"
                id="first_name"
                onChange={this.handleInputChanges}
                name="first_name"
                className={`form-control ${
                  this.state.isViewError ? "is-invalid" : ""
                } col-md-12`}
                placeholder="Enter user's first name"
              />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="last_name"> Last Name </label>
              <input
                type="text"
                id="last_name"
                onChange={this.handleInputChanges}
                name="last_name"
                className="form-control"
                placeholder="Enter user's last name"
              />
            </div>

            <div
              className={`form-group ${
                this.state.isViewError ? "has-error" : ""
              } col-md-12`}
            >
              <label htmlFor="email"> Email </label>
              {this.state.isViewError ? (
                <label className="control-label" htmlFor="email">
                  *
                </label>
              ) : (
                <></>
              )}
              <input
                type="email"
                id="email"
                onChange={this.handleInputChanges}
                name="email"
                className={`form-control ${
                  this.state.isViewError ? "is-invalid" : ""
                } col-md-12`}
                placeholder="Enter user's email address"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else))).
              </small>
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="phone"> Phone </label>
              <input
                type="text"
                id="phone"
                onChange={this.handleInputChanges}
                name="phone"
                className="form-control"
                placeholder="Enter user's phone number"
              />
            </div>
            <Roles
              onChange={this.handleCheackChanges}
              roles={this.state.roles}
            />
            <div className="form-group col-md-4 pull-right">
              <button
                className="btn btn-success"
                type="submit"
                disabled={loading}
              >
                Create user
              </button>
              {loading && <span className="fa fa-circle-o-notch fa-spin" />}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Create);
