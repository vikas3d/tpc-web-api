
<script type="text/javascript">
  $(document).ready(function() {

           // Set new rate

            $(".btn").on("click", function(e)
            {
                e.preventDefault();
                var rate =   $("#rate").val();
                var data = new FormData();
                var avalilable_stock = $("#avail_coins").val();
                var new_stock = $("#coins").val();
                var total_stock = Number(avalilable_stock) + Number(new_stock);
                //alert("new_stock "+new_stock);
              //  alert("old_stock "+avalilable_stock);
              //  return false;
                data.append('rate', rate);
                data.append('tcclimit', $("#tcclimit").val());
                data.append('stock', $('#coins').val());
                $("#loadingimg").show();
                $.ajax({
                    url : "rate",
                    type: "POST",
                    data : data,
                    processData: false,
                    contentType: false,
                    success:function(data, textStatus, jqXHR){
                      $("#myform")[0].reset();
                      $(".msg").show();
                      $("#result").html(" " + data.message);
                      $("#loadingimg").hide();
                      setTimeout(function(){
                          location.reload();
                      }, 2000);

                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        //if fails
                    }
                });
          });

$(function()
    {
        $("#myform").validate(
          {
            rules:
            {
              tcclimit:
              {
                required: true,
                min:1,
                number:true
              },
              rate:
              {
                required: true,
                number:true
              },
              description:
              {
                required: true,
                number:true
              }
            }
          });
    });

});
</script>
