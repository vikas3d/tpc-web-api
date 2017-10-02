<script type="text/javascript">
  $(document).ready(function() {

  // Aprove and deny new buying request for TCP //

   $( ".approvetcp" ).each(function(index) {
              $(this).on("click", function()
              {
                  var cid = $(this).attr('data');
                  var data = new FormData();
                  data.append('cid', cid);
                //  alert(cid);
                  //return false;
                  $("#loadertcp_"+cid).show();
                  $.ajax({
                      url : "/customer/approve-tcp",
                      type: "POST",
                      data : data,
                      processData: false,
                      contentType: false,
                      success:function(data, textStatus, jqXHR){
                        $("#resultbuy_"+cid).html(" " + data.message);
                        $(".tcpbuy").show();
                        $("#loadertcp_"+cid).hide();
                        setTimeout(function(){
                            location.reload();
                        }, 2000);
                      },
                      error: function(jqXHR, textStatus, errorThrown){
                          //if fails
                      }
                  });

                  //  alert(cid+'al');
          });
      });

  $( ".denytcp" ).each(function(index) {
          $(this).on("click", function()
          {
              var cid = $(this).attr('data');
              var data = new FormData();
              data.append('cid', cid);
              //alert(cid);
              //return false;
              $("#loaderdn_"+cid).show();
              $.ajax({
                  url : "/customer/deny-tpc",
                  type: "POST",
                  data : data,
                  processData: false,
                  contentType: false,
                  success:function(data, textStatus, jqXHR){
                    $("#resultbuy_"+cid).html(" " + data.message);
                    $(".tcpbuy").show();
                    $("#loaderdn_"+cid).hide();
                    setTimeout(function(){
                        location.reload();
                    }, 2000);
                  },
                  error: function(jqXHR, textStatus, errorThrown){
                      //if fails
                  }
              });
          });
    });

});
</script>
