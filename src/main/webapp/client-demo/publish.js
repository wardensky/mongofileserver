$(function() {
    function buildUeditor(id){
		//http://fex.baidu.com/ueditor/#start-toolbar
		//http://fex.baidu.com/ueditor/#start-config
		var editor = UE.getEditor(id || 'editor_id',{
			toolbars: [[
			'fullscreen','source', 'undo', 'redo', '|',
			'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
			'touppercase', 'tolowercase', '|',
			'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
			'directionalityltr', 'directionalityrtl', 'indent', '|',
			'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
			'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
			'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
			'simpleupload', 'insertimage', 'emotion', 'insertvideo', 'attachment', 'map', 'insertframe', 'insertcode', 'pagebreak', 'template', 'background', '|',
			'horizontal', 'date', 'time', 'spechars', 'wordimage', '|',
			'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
			'print', 'preview', 'searchreplace', 'drafts', 'help'
			]],
				elementPathEnabled: false, //是否启用元素路径，默认是显示
				initialFrameWidth: '100%', //初始化编辑器宽度，默认1000
				initialFrameHeight: 500 //编辑器拖动时最小高度，默认220
			});

		return editor;
	}
	buildUeditor('editor_id');
	
	$("#upload-btn").click(function(){
		$("#upload-img").click();
	});

	$("#upload-img").change(function() {
		var file = $(this).val();
		if (file) {
			upload2();
		}
	});
	
});

//ajaxFileUpload调用笨逼后台上传
function upload() {
    $.ajaxFileUpload({
        url: '/index/upload', //提交的路径
        secureuri: false, // 是否启用安全提交，默认为false
        fileElementId: 'upload-img', // file控件id
        dataType: 'json',
        success: function(data, status) //服务器成功响应处理函数
            {
				$("#upload-img").change(function() {
					var file = $(this).val();
                    if (file) {
						upload();
                    }
                });
				if(data.state){
					alert(data.message);
					return;
				}
                $("#img-path").val(data.path);
				alert("上传成功！" + data.f_id);
				//TODO f_id入库或跟form信息一起入库
            },
        error: function(data, status, e) //服务器响应失败处理函数
            {
				$("#upload-img").change(function() {
					var file = $(this).val();
                    if (file) {
						upload();
                    }
                });
				alert("上传失败！");
            }
    });
}

//jquery ajax 直接跨域上传
function upload2() {
    var file = $('#upload-img')[0].files[0];
    var formData = new FormData();
    formData.append("upload", file);
	$.ajax({
        type: "post",
        url: "http://domain.cn/gridfs-upload",
        contentType: false,
        processData: false,
        data: formData,
        success: function(data) {
            $("#img-path").val(data.fileName);
			alert("上传成功！" + data.f_id);
        },
        error: function(data) {
			alert("上传失败！");
        },
        complete: function(data) {
            console.debug(data);
        }
    });
}