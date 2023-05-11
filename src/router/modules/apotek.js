import OwnerApotek from '../../views/apotek/OwnerApotek.vue'
import DataApotek from '../../views/apotek/IndexApotek.vue'
import GroupingProduk from '../../views/apotek/GroupingProduk.vue'
import EditGroupingProduk from '../../views/apotek/EditGroupingProduk.vue'
import ProdukApotek from '../../views/apotek/ProdukApotek.vue'
export default[{
    path: '/owner_apotek',
    name: 'Owner Apotek',
    component: OwnerApotek
},
{
    path: '/apotek',
    name: 'Data Apotek',
    component: DataApotek
},

{
    path: '/apotek',
    children: [
        {
            path: 'grouping_produk',
            name: 'Grouping Produk',
            component: GroupingProduk
        },
        {
            path: 'grouping_produk/:id/edit',
            name: 'Edit Data Grouping',
            component: EditGroupingProduk
        },
        {
            path: 'produk_apotek',
            name: 'Produk Apotek',
            component: ProdukApotek
        },
    ]
},
]