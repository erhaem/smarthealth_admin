import KeahlianDokter from '@/views/dokter/KeahlianDokter.vue'
import DokterKeahlian from '@/views/dokter/DokterKeahlian.vue'
import PageDokter from '@/views/dokter/IndexDokter.vue'
import EditKeahlianDokter from '@/views/dokter/EditKeahlianDokter.vue'
import EditDokterKeahlian from '@/views/dokter/EditDokterKeahlian.vue'
import { checkRoles, roles } from '../../middleware/redirect'
export default [
{
    path: '/dokter',
    component: PageDokter,
    name: 'Dokter',
    meta: {
        middleware: checkRoles(roles.admin)
    }
},
{
    path: '/dokter',
    children: [
        {
            path: 'keahlian_dokter',
            name: 'Keahlian Dokter',
            component: KeahlianDokter,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'keahlian_dokter/:id/edit',
            name: 'Edit Keahlian Dokter',
            component: EditKeahlianDokter,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'dokter_keahlian',
            name: 'Dokter Keahlian',
            component: DokterKeahlian,
            meta: {
                middleware: checkRoles(roles.adminRs)
            }
        },
        {
            path: 'dokter_keahlian/:id/edit',
            name: 'Edit Dokter Keahlian',
            component: EditDokterKeahlian,
            meta: {
                middleware: checkRoles(roles.adminRs)
            }
        },
    ]
}
]