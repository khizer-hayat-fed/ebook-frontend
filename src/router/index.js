import { RouterProvider } from "react-router-dom";
import { router } from "./router";


export function RoutersProvider() {
    return <RouterProvider router={router} />
}