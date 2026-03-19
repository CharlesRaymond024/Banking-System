import { useContext } from "react";
import  AuthContext  from "../../src/providers/AuthProvider";

export default function useAuth() {

    return useContext(AuthContext);
}