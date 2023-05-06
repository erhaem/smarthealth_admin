<template>
    <button type="submit" :class="[styLe] + Color">
        <i class="fas fa-trash">
        </i>
        {{Message}} 
    </button>
</template>

<script>
export default{
    data(){
        return{
            styLe: ['btn btn-sm rounded mr-2 ']
        }
    },
    props: {
        Message: {
            type: String,
            default: "Submit"
        },
        Color: {
            type: String,
            default: 'btn-primary'
        },
        Icon: {
            type: String,
            default: 'fa-pencil'
        }
    }
}
</script>