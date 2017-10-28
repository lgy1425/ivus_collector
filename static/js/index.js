var current_patient = "patient1";
var current_vessel = "preLAD";
var ivus_dir = "./static/ivus_jpg/";
var frame_number = 1;

$(function() {
    $('#ex1').slider({
        formatter: function(value) {
            change_ivus(value);
            return 'Current frame: ' + value;
        }
    });
});


function change_ivus(frame_number) {
    ivus_file_dir = ivus_dir + current_patient +"/" +current_vessel +"/" + make_filename(frame_number);
    $("#ivus_img").attr("src",ivus_file_dir);
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