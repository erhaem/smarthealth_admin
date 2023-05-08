import {
    defineAbility
} from '@casl/ability';
import Cookie from "js-cookie";

const permisionsByRole = {
    "RO-2003061": [
        'show_Artikel', 'create_Artikel', 'edit_Artikel',
        'create_Kategori Artikel',
        'show_Dokter',
        'show_User',
        'show_Keahlian',
        'create_Kategori Produk', 'edit_Kategori Produk', 'show_Kategori Produk',
        'show_Spesialis'
    ],
    "RO-2003062": [
        'show_Artikel', 'create_Artikel', 'edit_Artikel',
    ],
    "RO-2003063": [
        'show_Kategori Produk'
    ],
    "RO-2003065": [
        'show_Kategori Produk'
    ],
    "RO-2003066": [
        'show_Rumah Sakit',
        'show_Fasilitas',
        'create_Fasilitas',
        'show_Dokter',
        'show_Spesialis'
    ],
}
export default defineAbility(can => {
    if (Cookie.get('user') !== undefined) {
        const user = JSON.parse(Cookie.get('user'))
        const roles = user.data.getRole.idRole
        const permisions = permisionsByRole[roles] || [];
        for (const permision of permisions) {
            const [actions, resource] = permision.split('_')
            can([actions], resource)
        }
    }
}
);