import RegisterPc from "./RegisterPc";
import {RegisterProvider} from "../../Common/providers";
import {useEffect} from "react";

const RegisterRefactor = (props) => {
  useEffect(() => {
  
  });
  return (
    <RegisterProvider>
      <RegisterPc {...props} />
    </RegisterProvider>)
}

export default RegisterRefactor;