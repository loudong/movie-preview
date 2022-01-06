import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { lazy } from "react";
import routers from "./routers";

export default function Routers () {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Switch> react-router-dom 6 使用Routes替代Switch */}
                    {
                        routers.map((route)=>{
                            return <Route key={`${route.path}`} path={route.path} element={routerComponent(route.component)} />
                        })
                    }
                {/* </Switch> */}
            </Routes>
        
        </BrowserRouter>
    )
}

function routerComponent (component) {
    const Component = lazy(component)
    return (
        <React.Suspense fallback={<>...</>}>
            <Component />
        </React.Suspense>
    )
}
