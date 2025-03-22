import { useLoaderData } from "react-router";
import type { Route } from "./+types/category";

const categories = [
    { 'category': '8322', 'urlKey': 'nha-sach-tiki', 'name': 'Nhà Sách Tiki' },
    { 'category': '1883', 'urlKey': 'nha-cua-doi-song', 'name': 'Nhà Cửa - Đời Sống' },
    { 'category': '1789', 'urlKey': 'dien-thoai-may-tinh-bang', 'name': 'Điện Thoại - Máy Tính Bảng' },
    { 'category': '2549', 'urlKey': 'do-choi-me-be', 'name': 'Đồ Chơi - Mẹ & Bé' },
    { 'category': '1815', 'urlKey': 'thiet-bi-kts-phu-kien-so', 'name': 'Thiết Bị Số - Phụ Kiện Số' },
    { 'category': '1882', 'urlKey': 'dien-gia-dung', 'name': 'Điện Gia Dụng' },
    { 'category': '1520', 'urlKey': 'lam-dep-suc-khoe', 'name': 'Làm Đẹp - Sức Khỏe' },
    { 'category': '8594', 'urlKey': 'o-to-xe-may-xe-dap', 'name': 'Ô Tô - Xe Máy - Xe Đạp' },
    { 'category': '931', 'urlKey': 'thoi-trang-nu', 'name': 'Thời trang nữ' },
    { 'category': '4384', 'urlKey': 'bach-hoa-online', 'name': 'Bách Hóa Online' },
    { 'category': '1975', 'urlKey': 'the-thao-da-ngoai', 'name': 'Thể Thao - Dã Ngoại' },
    { 'category': '915', 'urlKey': 'thoi-trang-nam', 'name': 'Thời trang nam' },
    { 'category': '17166', 'urlKey': 'cross-border-hang-quoc-te', 'name': 'Cross Border - Hàng Quốc Tế' },
    { 'category': '1846', 'urlKey': 'laptop-may-vi-tinh-linh-kien', 'name': 'Laptop - Máy Vi Tính - Linh kiện' },
    { 'category': '1686', 'urlKey': 'giay-dep-nam', 'name': 'Giày - Dép nam' },
    { 'category': '4221', 'urlKey': 'dien-tu-dien-lanh', 'name': 'Điện Tử - Điện Lạnh' },
    { 'category': '1703', 'urlKey': 'giay-dep-nu', 'name': 'Giày - Dép nữ' },
    { 'category': '1801', 'urlKey': 'may-anh', 'name': 'Máy Ảnh - Máy Quay Phim' },
    { 'category': '27498', 'urlKey': 'phu-kien-thoi-trang', 'name': 'Phụ kiện thời trang' },
    { 'category': '44792', 'urlKey': 'ngon', 'name': 'NGON' },
    { 'category': '8371', 'urlKey': 'dong-ho-va-trang-suc', 'name': 'Đồng hồ và Trang sức' },
    { 'category': '6000', 'urlKey': 'balo-va-vali', 'name': 'Balo và Vali' },
    { 'category': '11312', 'urlKey': 'voucher-dich-vu', 'name': 'Voucher - Dịch vụ' },
    { 'category': '976', 'urlKey': 'tui-vi-nu', 'name': 'Túi thời trang nữ' },
    { 'category': '27616', 'urlKey': 'tui-thoi-trang-nam', 'name': 'Túi thời trang nam' },
    { 'category': '15078', 'urlKey': 'cham-soc-nha-cua', 'name': 'Chăm sóc nhà cửa' },
]

export async function loader({ params }: Route.LoaderArgs) {
    const { id } = params; // Lấy urlKey từ URL

    // Tìm category từ danh sách dựa vào urlKey
    const category = categories.find(cat => cat.category === id.replace('c', ''));

    if (!category) {
        throw new Response("Category not found", { status: 404 });
    }

    return {
        id: category.category,
        name: category.name,
        urlKey: category.urlKey
    };
}

export function meta({ data }: Route.MetaArgs) {
    if (!data) {
        return [
            { title: "Danh mục | E-cCommerce" },
            { name: "description", content: "Khám phá các sản phẩm đa dạng tại Tiki." },
        ];
    }

    // Lấy name từ data của loader
    const { name } = data;

    return [
        { title: `${name} | E-cCommerce` },
        { name: "description", content: `Khám phá các sản phẩm ${name} tại Tiki. Giao hàng miễn phí, thanh toán dễ dàng.` },
        { property: "og:title", content: `${name} | E-cCommerce` },
        { property: "og:description", content: `Khám phá các sản phẩm ${name} tại Tiki. Giao hàng miễn phí, thanh toán dễ dàng.` },
    ];
}

export default function Category() {
    const { id, name, urlKey } = useLoaderData<typeof loader>();

    return (
        <div className="max-w-6xl mx-auto p-4 text-black">
            <h1 className="text-2xl font-bold mb-4 text-white">{name}</h1>
            <div className="bg-blue-100 p-4 rounded mb-4">
                <p>Category ID: {id}</p>
                <p>URL Key: {urlKey}</p>
            </div>

            {/* Nội dung danh mục */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Các sản phẩm trong danh mục */}
                <div className="bg-white p-4 rounded shadow">Sản phẩm 1</div>
                <div className="bg-white p-4 rounded shadow">Sản phẩm 2</div>
                <div className="bg-white p-4 rounded shadow">Sản phẩm 3</div>
                {/* ... */}
            </div>
        </div>
    );
}
