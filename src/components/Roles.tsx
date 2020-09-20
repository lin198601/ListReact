import React, { useEffect, useState } from "react";
import axios from "axios";
interface IRoles {
  id: number;
  role_name: string;
  value: number;
}
interface IRolesProps {
  onChange: (roles: number) => void;
  roles: number;
}

export default function Roles(props: IRolesProps) {
  const [roles, setRoles] = useState<Array<IRoles>>(new Array<IRoles>());
  useEffect(() => {
    axios.get(`http://localhost:5000/roles`).then((data) => {
      setRoles(data.data);
    });
  }, []);
  const handleCheackChanges = (e: React.FormEvent<HTMLInputElement>) => {
    let value = props.roles;
    if (e.currentTarget.checked) {
      value = value + Number(e.currentTarget.value);
    } else {
      value = value - Number(e.currentTarget.value);
    }
    props.onChange(value);
  };
  return (
    <div className="form-group col-md-12">
      <label htmlFor="description"> User Role </label>
      {roles.map((elem: IRoles) => {
        return (
          <div className="custom-control custom-checkbox" key={elem.id}>
            <input
              type="checkbox"
              className="custom-control-input"
              id={elem.role_name}
              value={elem.value}
              onChange={handleCheackChanges}
              checked={(props.roles & elem.value) > 0}
            />
            <label className="custom-control-label" htmlFor={elem.role_name}>
              {elem.role_name}
            </label>
          </div>
        );
      })}
    </div>
  );
}
