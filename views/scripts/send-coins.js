<script type="text/javascript">
$(document).ready(function() {
  $(".send-coins").on("click", function(e)
        {
          e.preventDefault();
          var coins =  $("#coins").val();
          var customer = $("#customer").val();
          $.ajax({
              url : "/send_coins",
              type: "POST",
              data : {customer : customer, coins: coins},
              dataType: 'json',
              success:function(data, textStatus, jqXHR){
                //alert(customer);
              },
              error: function(jqXHR, textStatus, errorThrown){
                //  alert(customer);
              }
          });
        });
});
</script>
