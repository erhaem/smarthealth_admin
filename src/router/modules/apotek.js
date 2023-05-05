import OwnerApotek from '../../views/apotek/OwnerApotek.vue'
import GroupingProduk from '../../views/apotek/GroupingProduk.vue'
import ProdukApotek from '../../views/apotek/ProdukApotek.vue'
export default[{
    path: '/owner_apotek',
    name: 'Owner Apotek',
    component: OwnerApotek
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
            path: 'produk_apotek',
            name: 'Produk Apotek',
            component: ProdukApotek
        },
    ]
}

]