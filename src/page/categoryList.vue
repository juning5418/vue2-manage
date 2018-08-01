<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">


            <el-tree
                :data="data2"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent">
            </el-tree>


            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  label="名称"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="排序"
                  prop="sort">
                </el-table-column>

                <el-table-column label="操作" width="200">
                  <template scope="scope">
                      <el-button v-if="level==1"
                      size="mini"
                      type="Success"
                      @click="showCategory(scope.$index, scope.row)">显示下一级分类</el-button>
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button v-if="level==1"
                      size="mini"
                      type="Success"
                      @click="addCategory(scope.$index, scope.row)">添加分类</el-button>

                      <el-button
                          size="mini"
                          type="Success"
                          @click="addSamelevelCategory(scope.$index, scope.row)">添加同级分类</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>


            <el-dialog title="修改分类信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="类型名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="类型排序" label-width="100px">
                        <el-input v-model="selectTable.sort"></el-input>
                    </el-form-item>

                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'

    import {getCategories,updateCategoryGoods,deleteCategoryGoods} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                queryId:1,
                level:1

            }
        },
        created(){
            this.initData();
        },
        mounted(){
            this.initData();
        },
        activated(){
            this.initData();
        },
    	components: {
    		headTop,
    	},
        methods: {
            async initData(){
                try{
                    this.queryId = this.$route.query.id;
                    this.level =  this.$route.query.level;
                    this.getCategories();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },




            async getCategories(){
                const categories = await getCategories({id:this.queryId, offset: this.offset, limit: this.limit});
                this.tableData = [];
                categories.forEach(item => {
                    const tableData = {};

                    if(this.level==1){
                        tableData.name = item.name;
                        tableData.sort = item.sort;
                        tableData.level = item.level;
                        tableData.pid = item.pid;
                        tableData.id = item.id;
                        tableData.image_path = item.image_path;
                        this.tableData.push(tableData);
                    }else if(this.level==2){
                        let newCategories = item.sub_categories;
                        newCategories.forEach(item1 => {
                            const tableData = {};
                            tableData.name = item1.name;
                            tableData.sort = item1.sort;
                            tableData.id = item1.id;
                            tableData.pid = item1.pid;
                            tableData.level = item1.level;
                            tableData.image_path = item1.image_path;
                            this.tableData.push(tableData);
                        });


                    }



                })
                console.log( this.tableData);


            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getCategories()
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.dialogFormVisible = true;

            },
            addCategory(index, row){
                this.$router.push({ path: 'addCategory', query: { id: row.id ,level:row.level+1}})
            },

            addSamelevelCategory(index, row){
                this.$router.push({ path: 'addCategory', query: { id: row.pid ,level:row.level}})

            },
            showCategory(index, row){
                this.$router.push({ path: 'categoryGoodsList', query: { id: row.id ,level:row.level+1}})
                this.initData();
            },
            async handleDelete(index, row) {
                try{
                    const res = await deleteCategoryGoods(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.tableData.splice(index, 1);
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除失败')
                }
            },

            async update(){
                this.dialogFormVisible = false;
                try{
                    // Object.assign(this.selectTable, this.address);
                    // this.selectTable.category = this.selectedCategory.join('/');
                    this.selectTable.pid=this.queryId;
                    const res = await updateCategoryGoods(this.selectTable)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.initData();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新信息失败', err);
                }
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
