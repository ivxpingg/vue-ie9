<template>
    <div class="iviewc-container">
         <div class="form">
             <Form>
                 <FormItem>
                     <Select>
                         <Option v-for="item in list" :value="item.id" :key="item.id" :label="item.label"></Option>
                     </Select>
                 </FormItem>
             </Form>
         </div>
    </div>
</template>

<script>
    export default {
        name: "iviewc",
        data() {
            return {
                list: [
                    {
                        id: '1',
                        label: '选项1'
                    },{
                        id: '2',
                        label: '选项2'
                    },{
                        id: '3',
                        label: '选项3'
                    }

                ]
            };
        }
    }
</script>

<style lang="css" scoped>
    .iviewc-container {

    }
    .form {
        width: 300px;
        margin: 0 auto;
    }
</style>