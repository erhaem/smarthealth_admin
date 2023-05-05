import IndexPerawat from '@/views/perawat/IndexPerawat.vue'
import { checkRoles, roles } from '../../middleware/redirect';

export default [{
    path: '/perawat',
    name: 'Perawat',
    component: IndexPerawat,
    meta: {
        middleware: checkRoles(roles.admin)
    }
}]