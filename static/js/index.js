var current_patient = "patient1";
var current_vessel = "preLAD";
var ivus_dir = "./static/ivus_jpg/";
var frame_number = 1;
var max_frame = 1675;

$(function() {
    $('#ex1').slider({
        formatter: function(value) {
            frame_number = value
            change_ivus(value,false);
            return 'Current frame: ' + value;
        }
    });

    $("#prev_btn").click(function(){
        if (frame_number > 1) {
            frame_number = frame_number - 1
        }

        change_ivus(frame_number,true);

    });

    $("#after_btn").click(function(){
        if (frame_number < max_frame) { 
            frame_number = frame_number + 1
        }

        change_ivus(frame_number,true);

    });

    $("html, body").on('mousewheel',function(e){
        if (e.originalEvent.deltaY>0) {
            if (frame_number < max_frame) { 
                frame_number = frame_number + 1
            }
            change_ivus(frame_number,true);
        } else {
            if (frame_number > 1) {
                frame_number = frame_number - 1
            }
            change_ivus(frame_number,true);
        }
    });
    
    $( "#vessel_select" ).change(function () {
      
        $.ajax({
            type:"POST",
            url:"/get_vessel_info",
            dataType: "json",
            contentType:"application/json",
            data : JSON.stringify({"vessel":$(this).val()}),
            success:function(args){

                max_frame = args['max_frame'];
                frame_number = 1;
                $("#ex1").slider("setValue",1);
                current_patient = args['patient'];
                current_vessel = args['v'];
                change_ivus(frame_number);
                $("#ex1").slider({ min: 1, max: max_frame, value: 1 });
                //$("#ex1").slider.data('slider').max = max_frame;


            }
        });


    });


});


function change_ivus(frame_number,slider_change) {
    ivus_file_dir = ivus_dir + current_patient +"/" +current_vessel +"/" + make_filename(frame_number);
    $("#frame_number").text(frame_number);
    $("#ivus_img").attr("src",ivus_file_dir);
    if (slider_change) {
        $("#ex1").slider("setValue",frame_number);
    }
    


}

function make_filename(frame_number) {
    if (frame_number < 10){
        return "000"+frame_number+".jpg"
    } else if (frame_number < 100){
        return "00"+frame_number+".jpg"
    } else if (frame_number < 1000){
        return "0"+frame_number+".jpg"
    } else if (frame_number >= 1000){
        return frame_number+".jpg"
    }

}