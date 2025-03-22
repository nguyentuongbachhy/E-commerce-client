import type { Route } from "./+types/about";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "About Us | My Company" },
        { name: "description", content: "Learn more about our company and our mission." },
    ];
}

export default function About() {
    return (
        <div className="w-full h-full bg-red-500">
            About
        </div>
    )
}
