$(".nav-tabs").on("click", "a", function (e) {
    e.preventDefault();
    if (!$(this).hasClass('add-fundus')) {
        $(this).tab('show');
    }
})
.on("click", "span", function () {
    var anchor = $(this).siblings('a');
    $(anchor.attr('href')).remove();
    $(this).parent().remove();
    $(".nav-tabs li").children('a').first().click();
});

$('.add-fundus').click(function (e) {
e.preventDefault();

var id = $(".nav-tabs").children().length;
var tabId = 'fundus_' + id;
$(this).closest('li').before('<li><a href="#fundus_' + id + '" id="tab_' + id + '">New Fundus</a> <span> x </span></li>');

var html = generate_new_tab(id)

$('.tab-content').append(html);



$('#tab_'+id).click();
});


function generate_new_tab(id) {
	var str = "<div class='tab-pane active' id='fundus_id_number'>\
                <input type='file' id='uploader_id_number' class='uploader' style='visibility: hidden;height:0px;' fundus_id='id_number'>\
                <div class='row' id='clinic_row_id_number'>\
                    <div class='col-md-8'>\
                        <div class='dragdrop' fundus_id='id_number' id='dragdrop_id_number'>\
                            <img src='' class='eye_img' id='eye_img_id_number'>\
                            <p>Drag&Drop<br><br>Fundus Photo</p>\
                        </div>\
                        <div class='upload_here' fundus_id='id_number' id='upload_here_id_number'>\
                            <p>or Upload here</p>\
                        </div>\
                        <p class='p_id_text' id='p_id_text_id_number'></p>\
                    </div>\
                    <div class='col-md-4'>\
                        <div class='noon'>\
                            <p class='drnoon'>&lt; Dr.Noon &gt;</p>\
                            <p class='clinic_note clinic_note_title' id='note_title_id_number'>&nbsp<p>\
                            <p class='clinic_note' id='optical_disk_id_number'>&nbsp<p>\
                            <p class='clinic_note' id='vessel_ratio_id_number'>&nbsp<p>\
                            <p class='clinic_note' id='bleeding_id_number'>&nbsp<p>\
                            <p class='clinic_note' id='retina_id_number'>&nbsp<p>\
                            <p class='clinic_note' id='etc_id_number'>&nbsp<p>\
                            <div class='detail_report_btn' id='detail_report_btn_id_number' onload='0' fundus_id='id_number'><p>Detail Report</p></div>\
                        </div>\
                    </div>\
                </div>\
                <div class='row detail_report_row' id='detail_report_id_number'><img src = './static/img/detail_report.png' class='detail_report_img' fundus_id='id_number'></div>\
            </div>\
            "

    str_replaced = str.replace(new RegExp('id_number', 'g'),id.toString());
    return str_replaced
}

$(function() {

	var obj = $(".dragdrop");

	var id = ""

	$(document).on('dragenter', '.dragdrop', function (e) { 

		e.stopPropagation();
        e.preventDefault();
	    id = $(this).attr("fundus_id");
	    
	});

	$(document).on('dragover', '.dragdrop', function (e) {

	    e.stopPropagation();
        e.preventDefault();
	});

	$(document).on('drop', '.dragdrop', function (e) { 


        e.preventDefault();
         var files = e.originalEvent.dataTransfer.files;

         //We need to send dropped files to Server
         handleFileUpload(files,id);
	});

	$(document).on('click', '.dragdrop', function (e) { 
		id = $(this).attr("fundus_id");
        $("#uploader_"+id).click();
	});


	$(document).on('click', '.upload_here', function (e) { 
        id = $(this).attr("fundus_id");
        $("#uploader_"+id).click();
	});

    $(document).on('change', '.uploader', function(){
        id = $(this).attr("fundus_id");
        handleFileUpload($("#uploader_"+id)[0].files,id);
    });

    $(document).on('click', '.detail_report_img', function(e){
        var parentOffset = $(this).parent().offset(); 
        var x = e.pageX - parentOffset.left;
        var y = e.pageY - parentOffset.top;
        var w = $(this).width();
        var h = $(this).height();
        
        w_r = x / w
        h_r = y / h
        if (w_r > 0.41 && w_r < 0.63 && h_r > 0.06 && h_r < 0.15) {
            id = $(this).attr("fundus_id");
            backToclinicnote(id);
        }


    });

    $(document).on('click', '.detail_report_btn', function (e) { 
        id = $(this).attr("fundus_id");
        if ($(this).attr("onload") == '0') {
            return
        } else {
            changeToDetailPage(id);
        }
	});

});


function backToclinicnote(id) {
    $("#clinic_row_"+id).css("height","100%");
    $("#detail_report_"+id).css("height","0px");
}

function changeToDetailPage(id) {
    $("#clinic_row_"+id).css("height","0px");
    $("#detail_report_"+id).css("height","100%");
}


function handleFileUpload(files,id) {
    var data = new FormData();
    $.each(files, function(i, file) {
            data.append(file['name'], file);
    });

    $.ajax({
           url: '/upload_eye',
           type: "post",
           dataType: "json",
           data: data,
           processData: false,
           contentType: false,
           beforeSend :function() {
                
            },
            success: function(data, textStatus, jqXHR) {                
                
            	$("#dragdrop_"+id + " p").remove();
            	$("#eye_img_"+id).attr("src",data['eye_path']);
            	$("#eye_img_"+id).css("width","100%");
            	$("#eye_img_"+id).css("height","100%");
            	$("#eye_img_"+id).css("top","0px");
            	$("#eye_img_"+id).css("position","relative");

            	$("#note_title_"+id).text("Clinical Note :")

            	if(data['optical_disk']){
            		$("#optical_disk_"+id).text("Optical Disk : 정상범위");
            	} else {
            		$("#optical_disk_"+id).text("Optical Disk : 비정상");
            	}

            	if(data['vessel_ratio']){
            		$("#vessel_ratio_"+id).text("Vessel Ratio : 정상범위");
            	} else {
            		$("#vessel_ratio_"+id).text("Vessel Ratio : 비정상");
            	}

            	if(data['vessel_ratio']){
            		$("#bleeding_"+id).text("Bleeding : 정상범위");
            	} else {
            		$("#bleeding_"+id).text("Bleeding : 비정상");
            	}

            	if(data['retina']){
            		$("#retina_"+id).text("Retina : 정상범위");
            	} else {
            		$("#retina_"+id).text("Retina : 비정상");
            	}

            	if(data['etc']){
            		$("#etc_"+id).text("기타문제 : 없음");
            	} else {
            		$("#etc_"+id).text("기타문제 : 비정상");
            	}

                $("#tab_"+id).text(data["fundus_name"]);
                $("#upload_here_"+id).remove();
                $("#p_id_text_"+id).text("ID : " + data["fundus_name"]);
                $("#detail_report_btn_"+id).attr("onload","1");


            }, error: function(jqXHR, textStatus, errorThrown) {
                //location.reload();
            },
            timeout: 20000
        });
}









