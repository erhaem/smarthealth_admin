import MasterData from '@/views/master-data/IndexMasterData.vue'
import KategoriProduk from '@/views/master-data/obat-produk/KategoriProduk.vue'
import EditKategoriProduk from '@/views/master-data/obat-produk/EditKategoriProduk.vue'
import IndexArtikel from '@/views/master-data/artikel/IndexArtikel.vue'
import KategoriArtikel from '@/views/master-data/artikel/KategoriArtikel.vue'
import EditArtikel from '@/views/master-data/artikel/EditArtikel.vue'
import EditKategoriArtikel from '@/views/master-data/artikel/EditKategoriArtikel.vue'
import GroupingArtikel from '@/views/master-data/artikel/GroupingArtikel.vue'
import EditGroupingArtikel from '@/views/master-data/artikel/EditGroupingArtikel.vue'
import IndexRumahSakit from '@/views/master-data/rumah-sakit/IndexRumahSakit.vue'
import TambahRumahSakit from '@/views/master-data/rumah-sakit/TambahRumahSakit.vue'
import EditRumahSakit from '@/views/master-data/rumah-sakit/EditRumahSakit.vue'
import FasilitasRumahSakit from '@/views/master-data/rumah-sakit/FasilitasRumahSakit.vue'
import EditFasilitas from '@/views/master-data/rumah-sakit/EditFasilitas.vue'
import IndexSpesialis from '@/views/master-data/spesialis-penyakit/IndexSpesialis.vue'
import EditSpesialisPenyakit from '@/views/master-data/spesialis-penyakit/EditSpesialisPenyakit.vue'
import IndexRs from '../../views/master-data/owner-rs/IndexOwnerRs.vue'
import EditOwnerRs from '@/views/master-data/owner-rs/EditOwnerRs.vue'
import { checkRoles, roles } from '../../middleware/redirect';

export default [{
    path: '/master',
    name: 'Master Data',
    component: MasterData,
},
{
    path: '/master',
    children: [
        // Routes Produk
        {
            path: 'kategori_produk',
            name: 'Kategori Produk',
            component: KategoriProduk,
            meta: {
                middleware: checkRoles(roles.adminOwnerApt)
            }
        },
        {
            path: 'kategori_produk/:id/edit',
            name: 'Edit Kategori Produk',
            component: EditKategoriProduk,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        // Routes Artikel
        {
            path: 'artikel',
            name: 'Artikel',
            component: IndexArtikel,
            meta: {
                middleware: checkRoles(roles.adminDokter)
            }
        },
        {
            path: 'artikel/:id/edit',
            name: 'Edit Artikel',
            component: EditArtikel,
            meta: {
                middleware: checkRoles(roles.adminDokter)
            }
        },
        {
            path: 'kategori_artikel',
            name: 'Kategori Artikel',
            component: KategoriArtikel,
            meta: {
                middleware: checkRoles(roles.adminDokter)
            }
        },
        {
            path: 'kategori_artikel/:id/edit',
            name: 'Edit Kategori Artikel',
            component: EditKategoriArtikel,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'grouping_artikel',
            name: 'Grouping Artikel',
            component: GroupingArtikel,
            meta: {
                middleware: checkRoles(roles.adminDokter)
            }
        },
        {
            path: 'grouping_artikel/:id/edit',
            name: 'Edit Grouping Artikel',
            component: EditGroupingArtikel,
            meta: {
                middleware: checkRoles(roles.adminDokter)
            }
        },
        // Routes Rumah Sakit
        {
            path: 'rumah_sakit',
            name: 'Rumah Sakit',
            component: IndexRumahSakit,
        },
        {
            path: 'rumah_sakit/create',
            name: 'Tambah Rumah Sakit',
            component: TambahRumahSakit,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'rumah_sakit/:id/edit',
            name: 'Edit Rumah Sakit',
            component: EditRumahSakit,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'fasilitas_rs',
            name: 'Fasilitas Rumah Sakit',
            component: FasilitasRumahSakit,
            meta: {
                middleware: checkRoles(roles.adminRsadminWeb)
            }
        },
        {
            path: 'fasilitas_rs/:id/edit',
            name: 'Edit Fasilitas Rumah Sakit',
            component: EditFasilitas,
            meta: {
                middleware: checkRoles(roles.adminRsadminWeb)
            }
        },
        // Owner Rumah Sakit
        {
            path: 'owner_rs',
            name: 'Owner Rumah Sakit',
            component: IndexRs,
        },
        {
            path: 'owner_rs/:id/edit',
            name: 'Edit Owner Rumah Sakit',
            component: EditOwnerRs,
        },
        // Routes Spesialis
        {
            path: 'spesialis_penyakit',
            name: 'Spesialis Penyakit',
            component: IndexSpesialis,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        },
        {
            path: 'spesialis_penyakit/:id/edit',
            name: 'Edit Spesialis Penyakit',
            component: EditSpesialisPenyakit,
            meta: {
                middleware: checkRoles(roles.admin)
            }
        }
    ]
}
]