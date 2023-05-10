import ProfilePage from '../../views/update-profil/ProfileUser.vue'
import ChangePassword from '../../views/update-profil/ChangePassword.vue'
export default[{
    path: '/profile',
    name: 'Update Profile',
    component: ProfilePage
},
{
    path: '/change_password',
    name: 'Change Password',
    component: ChangePassword
}]