<template>
    <div>
        <div class="f2Block">客户留言板</div>
        <el-table stripe border style="width:100%;" :data="messageData">
            <el-table-column width="180" label="姓名" prop="customerName"></el-table-column>
            <el-table-column width="180" label="类型" prop="type"></el-table-column>
            <el-table-column  label="留言" prop="message"></el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        name:'app',
        data(){
            return {
                messageData:[
                    {
                        customerName:'yaya',
                        type:'寄养',
                        message:'狗子好像还挺乐意去的',
                    },
                    {
                        customerName:'yaya',
                        type:'就诊',
                        message:'狗子好像还挺乐意去的',
                    },
                    {
                        customerName:'yaya',
                        type:'寄养',
                        message:'狗子好像还挺乐意去的',
                    }
                    
                ]
            }
        },
        methods:{

        }
    }
</script>