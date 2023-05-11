import { mapActions } from 'vuex';

export default {
  data() {
    return {
      groupingProduk: [],
      produkApotek: [],
      kategoriProduk: [],
      form: {
        id_produk_kategori: '',
        kode_produk: '',
      },
      selected: [], // Define the selected property here
      isLoading: false,
    };
  },
  created() {
    this.getProdukApotek();
    this.getGrouping();
    this.getKategoriProduk();
  },
  methods: {
    ...mapActions(['getData', 'postData']),
    getGrouping() {
      let type = 'getData';
      let url = ['apotek/produk/produk_kategori', {}];
      this.isLoading = true;
      this.getData(url)
        .then((result) => {
          this.groupingProduk = result.data;
          console.log(result.data);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Other methods here
  },
};
