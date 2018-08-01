<template>
    <div class="fillcontain">
        <head-top></head-top>
        <router-link :to="{path:'addBanners'}" >
            <el-button type="primary"  >新增</el-button>
        </router-link>
        <div class="table_container">
            <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
                <el-table-column type="expand">
                  <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="banner名称">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="banner链接">
                        <span>{{ props.row.url }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="banner名称"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="banner链接"
                  prop="url">
                </el-table-column>

                <el-table-column label="操作" width="160">
                  <template scope="scope">
                      <el-button v-if="scope.row.auth==0"
                          size="small"
                          @click="auth(scope.row)">
                         审核通过
                      </el-button>
                      <el-button v-else
                                 size="small"
                                 @click="auth(scope.row)">
                          撤销审核
                      </el-button>
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
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
            <el-dialog title="修改banner信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="banner名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="banner连接" label-width="100px">
                        <el-input v-model="selectTable.url"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" label-width="100px" >
                        <el-input v-model="selectTable.sort" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="banner图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="baseUrl + '/v1/addimg/banner'"
                          :show-file-list="false"
                          :on-remove="handleRemove"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.image" :src="baseImgPath + 'banner/'+  selectTable.image" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-button @click="handleRemove">删除</el-button>

                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateBanner">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getBannersCount,getBanners,addBanner,getBannerDetail,deleteBanner,updateBanner,authBanner} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                restaurant_id: null,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                selectMenu: {},
                selectIndex: null,
                expendRow: [],
            }
        },
        created(){
            this.initData();
        },
        activated(){
            this.initData();
        },
        computed: {

        },
    	components: {
    		headTop,
    	},
        methods: {
            async initData(){
                try{
                    const countData = await getBannersCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getBanners();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },

            async getBanners(){
                const banners = await getBanners({offset: this.offset, limit: this.limit});
                this.tableData = [];
                banners.forEach((item, index) => {
                    const tableData = {};
                    tableData.name = item.name;
                    tableData.id = item.id;
                    tableData.url = item.url;
                    tableData.image = item.image;
                    tableData.auth = item.auth?item.auth:0;
                    tableData.sort = item.sort?item.sort:0;
                    this.tableData.push(tableData);
                })
            },
            tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getBanners()
            },
            expand(row, status){
            	if (status) {
            		this.getSelectItemData(row)
            	}else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
            async auth(row){
                try{
                    if(row.auth==0){
                        row.auth=1;
                    }else{
                        row.auth=0;
                    }
                    const postData = {id:row.id,auth:row.auth};
                    const res = await authBanner(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.getBanners();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('操作失败', err);
                }

            },
            handleEdit(row) {
            	this.getSelectItemData(row, 'edit')
                this.dialogFormVisible = true;
            },
            async getSelectItemData(row, type){
                const banner = await getBannerDetail(row.id);
                this.selectTable = {...row, ...{name: banner.name, image: banner.image, url: banner.url}};

                this.tableData.splice(row.index, 1, {...this.selectTable});
                this.$nextTick(() => {
                    this.expendRow.push(row.index);
                })

            },
            handleSelect(index){
            	this.selectIndex = index;
            	this.selectMenu = this.menuOptions[index];
            },
            async handleDelete(index, row) {
                try{
                    const res = await deleteBanner(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除商品成功'
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
                    console.log('删除商品失败')
                }
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            handleRemove (file) {
                // 删除时在表单的某个字段里移除一个值
                this.bannerForm.image = null;

            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async updateBanner(){
                this.dialogFormVisible = false;
                try{
                	const postData = {...this.selectTable};
                    const res = await updateBanner(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.getBanners();
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
