import type { Route } from "./+types/contact";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Contact" },
        { name: "description", content: "If you have any questions. Please contact with us" },
    ];
}

export default function Contact() {
    return (
        <div className="w-full h-full bg-red-500">
            Contact
        </div>
    )
}
