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
                <div class='row'>\
                    <div class='col-md-8'>\
                        <div class='dragdrop' fundus_id='id_number' id='dragdrop_id_number'>\
                            <img src='' class='eye_img' id='eye_img_id_number'>\
                            <p>Drag&Drop<br><br>Fundus Photo</p>\
                        </div>\
                        <div class='upload_here' fundus_id='id_number'>\
                            <p>or Upload here</p>\
                        </div>\
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
                            <div class='detail_report_btn' fundus_id='id_number'><p>Detail Report</p></div>\
                        </div>\
                    </div>\
                </div>\
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

    $(".uploader").change(function() {
    	id = $(this).attr("fundus_id");
        handleFileUpload($("#uploader_"+id)[0].files,id);
    });


});




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



            }, error: function(jqXHR, textStatus, errorThrown) {
                location.reload();
            },
            timeout: 20000
        });
}









