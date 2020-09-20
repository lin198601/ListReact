import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import Roles from "./Roles";
import { IValues } from "./Create";

// export interface IValues {
//   [key: string]: any;
// }

export interface IFormState {
  id: number;
  values?: Record<keyof IValues, any>;
  submitSuccess: boolean;
  loading: boolean;
  isViewError: boolean;
}

class EditUser extends React.Component<RouteComponentProps<any>, IFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      loading: false,
      submitSuccess: false,
      isViewError: false,
    };
  }

  public componentDidMount(): void {
    axios.get(`http://localhost:5000/users/${this.state.id}`).then((data) => {
      this.setState({ values: data.data });
    });
  }

  private processFormSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (
      this.state.values &&
      (!this.state.values.email || !this.state.values.first_name)
    ) {
      this.setState({ isViewError: true });
    } else {
      this.setState({ loading: true });
      axios
        .patch(
          `http://localhost:5000/users/${this.state.id}`,
          this.state.values
        )
        .then((data) => {
          this.setState({ submitSuccess: true, loading: false });
          setTimeout(() => {
            this.props.history.push("/");
          }, 1500);
        });
    }
  };

  private setValues = (values: any) => {
    this.setState({ values: { ...this.state.values, ...values } });
  };

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setValues({ [e.currentTarget.id]: e.currentTarget.value });
  };

  public handleCheackChanges = (roles: number) => {
    if (this.state.values) {
      let _values: IValues = { ...this.state.values };
      _values.roles = roles;
      this.setState({ values: { ..._values } });
    }
  };
  public render() {
    const { submitSuccess } = this.state;
    return (
      <div className="App">
        {this.state.values && (
          <div>
            <div className={"col-md-12 form-wrapper"}>
              <h2> Edit User </h2>

              {submitSuccess && (
                <div className="alert alert-info" role="alert">
                  User's details has been edited successfully{" "}
                </div>
              )}

              <form
                id={"create-post-form"}
                onSubmit={this.processFormSubmission}
                noValidate={false}
              >
                <div className="form-group col-md-12">
                  <label htmlFor="first_name"> First Name </label>
                  <input
                    type="text"
                    id="first_name"
                    defaultValue={this.state.values.first_name}
                    onChange={(e) => this.handleInputChanges(e)}
                    name="first_name"
                    className="form-control"
                    placeholder="Enter user's first name"
                    readOnly={true}
                  />
                </div>

                <div className="form-group col-md-12">
                  <label htmlFor="last_name"> Last Name </label>
                  <input
                    type="text"
                    id="last_name"
                    defaultValue={this.state.values.last_name}
                    onChange={(e) => this.handleInputChanges(e)}
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
                    defaultValue={this.state.values.email}
                    onChange={(e) => this.handleInputChanges(e)}
                    name="email"
                    className={`form-control ${
                      this.state.isViewError ? "is-invalid" : ""
                    } col-md-12`}
                    placeholder="Enter user's email address"
                  />
                </div>

                <div className="form-group col-md-12">
                  <label htmlFor="phone"> Phone </label>
                  <input
                    type="text"
                    id="phone"
                    defaultValue={this.state.values.phone}
                    onChange={(e) => this.handleInputChanges(e)}
                    name="phone"
                    className="form-control"
                    placeholder="Enter user's phone number"
                  />
                </div>
                <Roles
                  onChange={this.handleCheackChanges}
                  roles={this.state.values?.roles}
                />
                <div className="form-group col-md-4 pull-right">
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={this.state.loading}
                  >
                    {"Edit User"}
                  </button>
                  {this.state.loading && (
                    <span className="fa fa-circle-o-notch fa-spin" />
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditUser);
