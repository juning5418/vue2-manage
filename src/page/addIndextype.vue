<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">

	  			<header class="form_header">添加</header>
	  			<el-form :model="indexForm" :rules="indexRules" ref="indexForm" label-width="110px" class="form food_form">
	  				<el-form-item label="名称" prop="name">
						<el-input v-model="indexForm.name"></el-input>
					</el-form-item>
					<el-form-item label="排序" prop="sort">
						<el-input v-model="indexForm.sort"></el-input>
					</el-form-item>
					<el-form-item label="上传图片（2:1)">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/food'"
						  :show-file-list="false"
						  :on-success="uploadImg"
                          :on-remove="handleRemove"
                          :before-upload="beforeImgUpload">
						  <img v-if="indexForm.image" :src="baseImgPath + indexForm.image" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
                        <el-button @click="handleRemove">删除</el-button>
                    </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addIndex('indexForm')">确认添加</el-button>
					</el-form-item>
	  			</el-form>

  			</el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {addIndexType} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			baseUrl,
    			baseImgPath,
    			restaurant_id: 1,
    			indexForm: {
    				name: '',
    				sort: '',
    				image: '',

    			},
    			indexRules: {

                    image: [
                        { required: true, message: '请输入image', trigger: 'blur' },
                    ],
    			}

    		}
    	},
    	components: {
    		headTop,
    	},
    	computed: {

    	},
    	methods: {

            handleRemove (file) {
                // 删除时在表单的某个字段里移除一个值
                this.indexForm.image = null;

            },
			uploadImg(res, file) {
				if (res.status == 1) {
					this.indexForm.image = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			beforeImgUpload(file) {
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
			tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },
            addIndex(indexForm){
		    	this.$refs[indexForm].validate(async (valid) => {
					if (valid) {
						const params = {
							...this.indexForm
						}
						try{
							const result = await addIndexType(params);
							if (result.status == 1) {
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.bannerForm = {
				    				name: '',
				    				url: '',
				    				image: ''
				    			}
                                this.$router.push({ path: 'indexTypesList'})
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
		    }
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
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
	.cell{
		text-align: center;
	}
</style>
