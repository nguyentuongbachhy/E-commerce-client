import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("routes/home.tsx"),
        route("about", "routes/about.tsx"),
        route("contact", "routes/contact.tsx"),
        route("category/:name/:id", "routes/category.tsx"),
    ]),


    layout("routes/auth/layout.tsx", [
        route("login", "routes/auth/login.tsx"),
        route("register", "routes/auth/register.tsx")
    ])

] satisfies RouteConfig;
